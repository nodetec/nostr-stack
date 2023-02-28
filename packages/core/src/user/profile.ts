import fetch from "isomorphic-fetch";
import { compact, groupBy, mapValues, maxBy } from "lodash";
import { Event, nip19 } from "nostr-tools";
import { createEvent, createUserMetadataEvent } from "../event";
import { createUserMetadataFilter } from "../filters";
import { Pool } from "../relay";

export interface UserProfile {
  pubkey: string;
  name: string;
  picture?: string;
  banner?: string;
  about?: string;
  display_name?: string;
  lud06?: string;
  nip05?: string;
}

/**
 * Ask all relays in pool for metadata about a user
 * This will return the first result it finds
 */
export const getProfile = async (
  pubkey: string,
  relayPool: Pool
): Promise<UserProfile | null> => {
  if (isNpub(pubkey)) pubkey = decodeNpub(pubkey);
  const filter = createUserMetadataFilter([pubkey]);
  const res = await relayPool.list([filter], { id: "user.profile" });
  if (!res) return null;
  const latest = dedupeProfiles(res)[0];
  if (!latest) return null;
  return kind0EventToProfile(latest);
};

export const getProfiles = async (pubKeys: string[], relayPool: Pool) => {
  const keys = pubKeys.map((key) => (isNpub(key) ? decodeNpub(key) : key));
  const filter = createUserMetadataFilter(keys);
  const res = await relayPool.list([filter], { id: "user.profile" });
  if (!res) return null;
  const deduped = compact(dedupeProfiles(res));
  return deduped.map(kind0EventToProfile);
};

/**
 * Send an event to all relays in pool to update the user's profile
 */
export const setProfile = async (
  profile: UserProfile,
  sk: string,
  relayPool: Pool
) => {
  const event = createEvent(createUserMetadataEvent(profile), sk);
  await relayPool.ensure();
  const success = await relayPool.publish(event);
  if (!success) throw new Error("Failed to publish event");
  return true;
};

/**
 * Look up a users profile by their nip05 address
 */
export const getProfileFromNip05 = async (nip05: string, relayPool: Pool) => {
  const pubkey = await getPublicKeyFromNip05(nip05);
  if (!pubkey) return null;
  return getProfile(pubkey, relayPool);
};

/**
 * This will handle encoding all proper information
 * * Bech32 encoding of pubic key
 */
export const toDisplayProfile = (profile: UserProfile) => {
  return {
    ...profile,
    pubkey: nip19.npubEncode(profile.pubkey),
  };
};

const NIP05_FORMAT =
  "https://<domain>/.well-known/nostr.json?name=<local-part>";
type Nip05Response = {
  names?: {
    [key: string]: string;
  };
};
/**
 * Verifies a users nip05 address according the specs laid out in
 * https://github.com/nostr-protocol/nips/blob/master/05.md
 */
export const verifyNip05 = async (profile: UserProfile): Promise<boolean> => {
  if (!profile.nip05) return false;
  const [localPart, domain] = profile.nip05.split("@");
  const url = NIP05_FORMAT.replace("<domain>", domain).replace(
    "<local-part>",
    localPart
  );

  try {
    const res = await fetch(url);
    if (!res.ok) return false;
    const data = (await res.json()) as Nip05Response;
    if (!data.names) return false;
    if (data.names[localPart] !== profile.pubkey) return false;
    return true;
  } catch {
    return false;
  }
};

export const getPublicKeyFromNip05 = async (
  nip05: string
): Promise<string | null> => {
  const [localPart, domain] = nip05.split("@");
  const url = NIP05_FORMAT.replace("<domain>", domain).replace(
    "<local-part>",
    localPart.toLowerCase()
  );
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = (await res.json()) as Nip05Response;
    if (!data.names) return null;
    return data.names[localPart.toLowerCase()];
  } catch {
    return null;
  }
};

const isNpub = (pk: string) => {
  try {
    return nip19.decode(pk).type === "npub";
  } catch {
    return false;
  }
};

const decodeNpub = (npub: string) => {
  return nip19.decode(npub).data as string;
};

/**
 * It's possible that relays do not have the most up to date profile info.
 * If we get more than one profile event for a user, we want to use the most
 * recent one.
 */
const dedupeProfiles = (profileEvents: Event[]) => {
  const mapped = groupBy(profileEvents, "pubkey");
  const withLatest = mapValues(mapped, (events) =>
    maxBy(events, (e) => e.created_at)
  );
  return Object.values(withLatest);
};

const kind0EventToProfile = (event: Event) => {
  if (event.kind !== 0) throw new Error("Invalid event kind");
  const data = JSON.parse(event.content);
  return { ...data, pubkey: event.pubkey } as UserProfile;
};

import fetch from "isomorphic-fetch";
import { nip19 } from "nostr-tools";
import { createEvent, createUserMetadataEvent } from "../event";
import { createUserMetadataFilter } from "../filters";
import { Pool } from "../relay";

export interface UserProfile {
  pubkey: string;
  name: string;
  picture?: string;
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
  const filter = createUserMetadataFilter([pubkey]);
  const res = await relayPool.get(filter);
  if (!res) return null;
  const data = JSON.parse(res.content);
  return { ...data, pubkey } as UserProfile;
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
export const verifyNip05 = async (profile: UserProfile) => {
  if (!profile.nip05) return false;
  const [localPart, domain] = profile.nip05.split("@");
  const url = NIP05_FORMAT.replace("<domain>", domain).replace(
    "<local-part>",
    localPart
  );
  const res = await fetch(url);
  if (!res.ok) return false;
  const data = (await res.json()) as Nip05Response;
  if (!data.names) return false;
  if (data.names[localPart] !== profile.pubkey) return false;
  return true;
};

export const getPublicKeyFromNip05 = async (nip05: string) => {
  const [localPart, domain] = nip05.split("@");
  const url = NIP05_FORMAT.replace("<domain>", domain).replace(
    "<local-part>",
    localPart
  );
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = (await res.json()) as Nip05Response;
  if (!data.names) return null;
  return data.names[localPart];
};

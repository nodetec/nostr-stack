import fetch from "isomorphic-fetch";
import { createEvent, createUserMetadataEvent } from "../event";
import { createUserMetadataFilter } from "../filters";
import { Pool } from "../relay";

export interface UserProfile {
  pubkey: string;
  name: string;
  nip05?: string;
}

/**
 * Ask all relays in pool for metadata about a user
 * This will return the first result it finds
 */
export const getUserProfile = async (
  pubkey: string,
  relayPool: Pool
): Promise<UserProfile | null> => {
  const filter = createUserMetadataFilter([pubkey]);
  const res = await relayPool.get(filter);
  if (!res) return null;
  const data = JSON.parse(res.content);
  return data as UserProfile;
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

const NIP05_FORMAT =
  "https://<domain>/.well-known/nostr.json?name=<local-part>";
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
  const data = await res.json();
  if (data.names[localPart] !== profile.pubkey) return false;
  return true;
};

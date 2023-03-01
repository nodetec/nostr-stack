import { omit } from "lodash";
import { EventTemplate } from "nostr-tools";
import { UserProfile } from "../user/profile";

export const createUserMetadataEvent = (
  userProfile: UserProfile
): EventTemplate => {
  return {
    kind: 0,
    content: JSON.stringify(omit(userProfile, "pubkey")),
    tags: [],
    created_at: Date.now(),
  };
};

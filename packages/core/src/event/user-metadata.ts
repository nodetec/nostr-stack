import { EventTemplate } from "nostr-tools";
import { UserProfile } from "../user/profile";

export const createUserMetadataEvent = (
  userProfile: UserProfile
): EventTemplate => {
  return {
    kind: 0,
    content: JSON.stringify(userProfile),
    tags: [],
    created_at: Date.now(),
  };
};

import { omit } from "lodash";
import { EventTemplate } from "nostr-tools";
import { UserProfile } from "../user/profile";

interface BaseParams {
  userProfile: UserProfile;
}
export const base = ({ userProfile }: BaseParams): EventTemplate => {
  return {
    kind: 0,
    content: JSON.stringify(omit(userProfile, "pubkey")),
    tags: [],
    created_at: Math.floor(Date.now() / 1000),
  };
};

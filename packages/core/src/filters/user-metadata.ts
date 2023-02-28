import { Filter } from "nostr-tools";

export const createUserMetadataFilter = (ids: string[]): Filter => {
  return {
    kinds: [0],
    authors: ids,
  };
};

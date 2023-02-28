import { subHours, getUnixTime } from "date-fns";
import type { Filter } from "nostr-tools";

export const createGlobalFeedFilter = (
  since: Date = subHours(new Date(), 1)
): Filter => {
  return {
    kinds: [1],
    since: getUnixTime(since),
  };
};

import { RelayPool } from "../relay";
import { subHours, getUnixTime } from "date-fns";
import type { Filter } from "nostr-tools";

type FilterOptions = Omit<FeedOptions, "relays">;
export const createGlobalFeedFilter = ({
  since = subHours(new Date(), 1),
  limit = 500,
}: FilterOptions): Filter => {
  return {
    kinds: [1],
    since: getUnixTime(since),
    limit,
  };
};

type FeedOptions = {
  limit?: number;
  since?: Date;
  relays?: string[];
};
export const getGlobalFeed = (relayPool: RelayPool, opts?: FeedOptions) => {
  const filter = createGlobalFeedFilter(opts ?? {});
  return relayPool.list([filter], { id: "feed.global" }, opts?.relays);
};

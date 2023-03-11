import { Event, feed } from "@nostr-stack/core";
import { useEffect, useState } from "react";
import { useRelays } from "./relay";

export const useGlobalFeed = (relays?: string[], loadOnInit = true) => {
  const { pool } = useRelays();
  const [items, setFeed] = useState<Event[]>([]);
  const [loading, setLoading] = useState(loadOnInit);

  useEffect(() => {
    if (loading) {
      feed
        .getGlobalFeed(pool, { relays })
        .then((items) => {
          setFeed(items);
        })
        .finally(() => setLoading(false));
    }
  }, [loading]);

  return { items, loading, load: () => setLoading(true) };
};

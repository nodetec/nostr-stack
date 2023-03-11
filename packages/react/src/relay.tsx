import {
  relay,
  type Filter,
  type Event,
  type SubscriptionOptions,
} from "@nostr-stack/core";
import { createContext, useContext } from "react";
import useConstant from "use-constant";

interface Relay {
  get: (filter: Filter, subOpts?: SubscriptionOptions) => Promise<Event | null>;
  list: (filters: Filter[], subOpts?: SubscriptionOptions) => Promise<Event[]>;
  publish: (event: Event, relays?: string[]) => Promise<boolean>;
  pool: relay.RelayPool;
}

const relayContext = createContext<relay.RelayPool>(new relay.RelayPool([]));
export const RelayProvider = ({
  children,
  relayUrls,
}: {
  children: React.ReactNode;
  relayUrls?: string[];
}) => {
  const pool = useConstant(() => new relay.RelayPool(relayUrls ?? []));

  return <relayContext.Provider value={pool}>{children}</relayContext.Provider>;
};

export const useRelays = (): Relay => {
  const pool = useContext(relayContext);

  const get = async (
    filter: Filter,
    subOpts?: SubscriptionOptions,
    relays?: string[]
  ) => {
    return pool.get(filter, subOpts);
  };

  const list = async (
    filters: Filter[],
    subOpts?: SubscriptionOptions,
    relays?: string[]
  ) => {
    return pool.list(filters, subOpts);
  };

  const publish = async (event: Event, relays?: string[]) => {
    return pool.publish(event, relays);
  };

  return {
    get,
    list,
    publish,
    pool,
  };
};

import {
  relay,
  type Filter,
  type Event,
  type SubscriptionOptions,
} from "@nostr-stack/core";
import { atom, useAtom, useAtomValue, Provider, createStore } from "jotai";
import { useEffect, useState } from "react";
import { uniq } from "lodash";

interface Relay {
  get: (filter: Filter, subOpts?: SubscriptionOptions) => Promise<Event | null>;
  list: (filters: Filter[], subOpts?: SubscriptionOptions) => Promise<Event[]>;
  publish: (event: Event, relays?: string[]) => Promise<boolean>;
  addRelay: (relayUrl: string) => void;
  pool: relay.RelayPool;
}

const store = createStore();
const poolAtom = atom<relay.RelayPool>(new relay.RelayPool([]));

export const useRelayPool = () => useAtomValue(poolAtom);
export const RelayProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

/**
 * A hook that returns a relay for more "raw" access to the network.
 * Useful for sending events that may not be implemented yet
 */
export function useRelays(relayUrls?: string[]): Relay {
  const [pool] = useAtom(poolAtom);
  const [relays, setRelays] = useState<string[]>(relayUrls ?? []);

  useEffect(() => {
    pool.addRelays(relays);
  }, [relays]);

  const get = async (filter: Filter, subOpts?: SubscriptionOptions) => {
    return pool.get(filter, subOpts);
  };

  const list = async (filters: Filter[], subOpts?: SubscriptionOptions) => {
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
    addRelay: (relayUrl: string) => setRelays((r) => uniq([...r, relayUrl])),
  };
}

/**
 * Interact with a single relay
 */
export function useRelay(relayUrl: string): Omit<Relay, "addRelay" | "pool"> {
  const [pool] = useAtom(poolAtom);

  const get = async (filter: Filter, subOpts?: SubscriptionOptions) => {
    return pool.get(filter, subOpts, [relayUrl]);
  };

  const list = async (filters: Filter[], subOpts?: SubscriptionOptions) => {
    return pool.list(filters, subOpts, [relayUrl]);
  };

  const publish = async (event: Event) => {
    return pool.publish(event, [relayUrl]);
  };

  return {
    get,
    list,
    publish,
  };
}

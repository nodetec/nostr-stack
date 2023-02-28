import {
  type Relay,
  SimplePool,
  type Event,
  type Filter,
  type SubscriptionOptions,
} from "nostr-tools";

export interface Pool {
  ensure: () => Promise<void>;
  pool: SimplePool;
  connectedRelays: Relay[];
  get: (
    filter: Filter,
    subOpts?: SubscriptionOptions,
    relays?: string[]
  ) => Promise<Event | null>;
  list: (
    filters: Filter[],
    subOpts?: SubscriptionOptions,
    relays?: string[]
  ) => Promise<Event[]>;
  publish: (event: Event) => Promise<boolean>;
}

export const createPool = (relays: string[]): Pool => {
  const _relays: Relay[] = [];
  const getRelayUrls = () => _relays.map((r) => r.url);
  const pool = new SimplePool();

  const ensure = async () => {
    for (const relay of relays) {
      const _relay = await pool.ensureRelay(relay);
      _relays.push(_relay);
    }
  };
  const get = async (
    filter: Filter,
    subOpts?: SubscriptionOptions,
    relays = _relays.map((r) => r.url)
  ) => {
    const res = await pool.get(relays, filter, subOpts);
    return res;
  };

  const list = async (
    filters: Filter[],
    subOpts?: SubscriptionOptions,
    relays = getRelayUrls()
  ) => {
    const res = await pool.list(relays, filters, subOpts);
    return res;
  };

  const publish = (event: Event) => {
    const pub = pool.publish(
      _relays.map((r) => r.url),
      event
    );
    return new Promise<boolean>((resolve, reject) => {
      pub.on("ok", () => resolve(true));
      pub.on("failed", (reason: string) => reject(reason));
    });
  };

  return {
    ensure,
    pool,
    publish,
    get,
    list,
    get connectedRelays() {
      return _relays;
    },
  };
};

import { uniq } from "lodash";
import {
  type Relay,
  SimplePool,
  type Event,
  type Filter,
  type SubscriptionOptions,
} from "nostr-tools";

export class RelayPool {
  #relayUrls: string[] = [];
  pool: SimplePool;

  constructor(relayUrls: string[]) {
    this.#relayUrls = relayUrls;
    this.pool = new SimplePool();
  }

  async tryConnectAll() {
    for (const relayUrl of this.#relayUrls) {
      const relay = await this.pool.ensureRelay(relayUrl);
    }
  }

  disconnectAll() {
    this.pool.close(this.#relayUrls);
  }

  addRelay(relayUrl: string) {
    if (this.#relayUrls.includes(relayUrl)) return;
    this.#relayUrls = uniq([...this.#relayUrls, relayUrl]);
  }

  addRelays(relayUrls: string[]) {
    this.#relayUrls = uniq([...this.#relayUrls, ...relayUrls]);
  }

  async get(
    filter: Filter,
    subOpts?: SubscriptionOptions | undefined,
    relays?: string[] | undefined
  ): Promise<Event | null> {
    const res = await this.pool.get(relays || this.#relayUrls, filter, subOpts);
    return res;
  }

  async list(
    filters: Filter[],
    subOpts?: SubscriptionOptions | undefined,
    relays?: string[] | undefined
  ): Promise<Event[]> {
    const res = await this.pool.list(
      relays || this.#relayUrls,
      filters,
      subOpts
    );
    return res;
  }

  async publish(event: Event, relays?: string[]): Promise<boolean> {
    const pub = this.pool.publish(relays ?? this.#relayUrls, event);
    return new Promise<boolean>((resolve, reject) => {
      pub.on("ok", () => resolve(true));
      pub.on("failed", (reason: string) => reject(reason));
    });
  }
}

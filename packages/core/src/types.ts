import { Event, EventTemplate } from "nostr-tools";

export interface Nip07Extension {
  getPublicKey: () => Promise<string>;
  signEvent: (event: EventTemplate) => Promise<Event>;
  getRelays: () => Promise<{
    [key: string]: { read: boolean; write: boolean };
  }>;
  nip04?: {
    encrypt?: (pubkey: string, plaintext: string) => Promise<string>;
    decrypt?: (pubkey: string, ciphertext: string) => Promise<string>;
  };
}

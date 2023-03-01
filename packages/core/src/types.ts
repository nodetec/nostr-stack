import { Event, EventTemplate } from "nostr-tools";

export interface NostrExtension {
  getPublicKey: () => string;
  signEvent: (event: EventTemplate) => Event;
  getRelays: () => { [key: string]: { read: boolean; write: boolean } };
  nip04?: {
    encrypt?: (pubkey: string, plaintext: string) => string;
    decrypt?: (pubkey: string, ciphertext: string) => string;
  };
}

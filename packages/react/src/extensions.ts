import type { Nip07Extension, Event, EventTemplate } from "@nostr-stack/core";
import { useState } from "react";

declare global {
  interface Window {
    nostr?: Nip07Extension;
  }
}

/**
 * Handles interactions with a NIP07 compatible extension.
 * Will also store the public key after authorization
 */
export const useNip07Extension = () => {
  const [pubkey, setPubKey] = useState<string>();

  async function login() {
    if (!window.nostr) return;
    const pk = await window.nostr.getPublicKey();
    if (!pk) return;
    setPubKey(pk);
  }

  async function sign(event: EventTemplate): Promise<Event> {
    if (!window.nostr) throw new Error("No extension found");
    return await window.nostr.signEvent(event);
  }

  return {
    pubkey,
    login,
    logout: () => setPubKey(undefined),
    sign,
  };
};

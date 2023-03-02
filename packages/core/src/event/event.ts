import { type EventTemplate, finishEvent } from "nostr-tools";

export const createSignedEvent = (event: EventTemplate, sk: string) => {
  return finishEvent(event, sk);
};

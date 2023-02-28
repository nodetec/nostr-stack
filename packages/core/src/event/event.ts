import { type EventTemplate, finishEvent } from "nostr-tools";

export const createEvent = (event: EventTemplate, sk: string) => {
  return finishEvent(event, sk);
};

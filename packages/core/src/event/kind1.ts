import { uniq, uniqBy } from "lodash";
import { EventTemplate, Event } from "nostr-tools";

type BaseParams = {
  content: string;
  createdAt?: number;
};

export const base = ({
  content,
  createdAt = Math.floor(Date.now() / 1000),
}: BaseParams): EventTemplate => {
  return {
    content,
    tags: [],
    kind: 1,
    created_at: createdAt,
  };
};

type ReplyParams = BaseParams & {
  events: Event[];
  relayUrl?: string;
};

/**
 * Handles creating a reply event
 * TODO: Test if this logic works
 */
export const reply = ({
  content,
  events,
  relayUrl = "",
  createdAt,
}: ReplyParams) => {
  const eventsTags = uniqBy(
    events.map((e) => ["e", e.id, relayUrl]),
    (t) => t[1]
  );
  const eventAuthors = events.map((e) => e.pubkey);
  const threadedAuthors = events.flatMap((e) =>
    e.tags.filter((t) => t[0] === "p").map((t) => t[1])
  );
  const threadedKeys = uniq([...eventAuthors, ...threadedAuthors]);
  const threadedKeysTags = threadedKeys.map((k) => ["p", k]);
  return {
    ...base({ content, createdAt }),
    tags: [...eventsTags, ...threadedKeysTags],
  };
};

// 1a50a4268a9c4561a9abbf3fee828e150ce49617a82e56f28737f4e05146544c

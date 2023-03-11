import { Filter, nip19 } from "nostr-tools";
import { RelayPool } from "../relay";

type Options = {
  relays?: string[];
};
export const getEventByNoteId = async (
  noteId: string,
  relayPool: RelayPool,
  opts?: Options
) => {
  let decodedNoteId = noteId;
  if (noteId.startsWith("note")) {
    const decoded = nip19.decode(noteId);
    if (decoded.type !== "note") {
      throw new Error("Invalid note ID");
    }
    decodedNoteId = decoded.data as string;
  }
  const filter: Filter = {
    kinds: [1],
    ids: [decodedNoteId],
  };
  const event = await relayPool.get(
    filter,
    { id: "note.getById" },
    opts?.relays
  );
  return event;
};

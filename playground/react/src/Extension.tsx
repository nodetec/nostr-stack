import { useNip07Extension } from "@nostr-stack/react";
import { user, event, Event } from "@nostr-stack/core";
import { useState } from "react";
/**
 * Testing out event signing with browser extension like nos2x
 */

export const Extension = () => {
  const { pubkey, login, sign, logout } = useNip07Extension();
  const [note, setNote] = useState("");
  const [signedEvent, setSignedEvent] = useState<Event | null>(null);

  const handleSign = async () => {
    const ev = event.kind1.base({ content: note });
    const signedEvent = await sign(ev);
    setSignedEvent(signedEvent);
  };

  return (
    <div>
      <div>
        <h4>
          Your pubkey is {pubkey ? user.toDisplayPubkey(pubkey) : "Unknown"}
        </h4>
        {pubkey && <button onClick={() => logout()}>Logout</button>}
        {!pubkey && (
          <button onClick={() => login()}>Login with extension</button>
        )}
      </div>
      {pubkey && (
        <div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.currentTarget.value)}
          />
          <button onClick={handleSign}>Sign Note</button>
        </div>
      )}
      <div style={{ overflow: "wrap", width: 200 }}>
        {signedEvent && <pre>{JSON.stringify(signedEvent)}</pre>}
      </div>
    </div>
  );
};

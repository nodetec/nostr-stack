import { useGlobalFeed } from "@nostr-stack/react";

export const Feed = () => {
  const { items, load, loading } = useGlobalFeed(undefined, false);
  return (
    <div>
      <button onClick={load}>Load</button>
      <h2>Feed</h2>
      {loading && <div>Loading...</div>}
      {!loading && <div>{items.length} items loaded</div>}
      {items.slice(0, 20).map((e) => (
        <div key={e.id}>
          <p>{e.pubkey}</p>
          <p>{e.content}</p>
        </div>
      ))}
    </div>
  );
};

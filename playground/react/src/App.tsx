import "@nostr-stack/ui/style.css";
import { useRelays } from "@nostr-stack/react";
import { Profile } from "./Profile";
import { Profiles } from "./Profiles";
import { Extension } from "./Extension";

function App() {
  useRelays(["wss://nostr.wine", "wss://nos.lol"]); // Initialize app with some relays
  return (
    <div>
      <h2>Playground</h2>
      <Profile />
      {/* <Profiles /> */}
      {/* <Extension /> */}
    </div>
  );
}

export default App;

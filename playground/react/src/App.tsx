import "@nostr-stack/ui/style.css";
import { Route, Link } from "wouter";
import { RelayProvider } from "@nostr-stack/react";
import { Profile } from "./Profile";
import { Profiles } from "./Profiles";
import { Extension } from "./Extension";
import { Feed } from "./Feed";

function App() {
  return (
    <RelayProvider relayUrls={["wss://nostr.wine"]}>
      <div>
        <h2>Playground</h2>
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          <button>
            <Link href="/profile">Profile</Link>
          </button>
          <button>
            <Link href="/profiles">Profiles</Link>
          </button>
          <button>
            <Link href="/extension">Extension</Link>
          </button>
          <button>
            <Link href="/feed">Feed</Link>
          </button>
        </div>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/profiles">
          <Profiles />
        </Route>
        <Route path="/extension">
          <Extension />
        </Route>
        <Route path="/feed">
          <Feed />
        </Route>
      </div>
    </RelayProvider>
  );
}

export default App;

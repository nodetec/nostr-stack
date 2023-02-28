<script lang="ts">
  import { relay, user } from "@nostr-stack/core";
  import { onMount } from "svelte";

  const pool = relay.createPool(["wss://eden.nostr.land", "wss://nostr.wine"]);
  let profile: user.UserProfile | null;
  let nip05 = "";
  let npub = "";
  onMount(async () => {
    await pool.ensure();
  });
  $: displayProfile = profile ? user.toDisplayProfile(profile) : null;
</script>

<div>
  <form
    on:submit|preventDefault={async () =>
      (profile = await user.getProfileFromNip05(nip05, pool))}
  >
    <label
      >Enter a Nip05 address
      <input type="text" bind:value={nip05} />
    </label>
    <button>Search</button>
  </form>
  <form
    on:submit|preventDefault={async () =>
      (profile = await user.getProfile(npub, pool))}
  >
    <label
      >Enter a npub address
      <input type="text" bind:value={npub} />
    </label>
    <button>Search</button>
  </form>
  <p>Your public key is {displayProfile?.pubkey}</p>
  <p>Your name is {displayProfile?.name}</p>
  <p>
    Your picture looks like this <img
      src={displayProfile?.picture}
      alt="profile"
    />
  </p>
</div>

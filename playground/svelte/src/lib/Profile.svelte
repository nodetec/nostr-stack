<script lang="ts">
  import { relay, user } from "@nostr-stack/core";
  import { onMount } from "svelte";

  const pool = relay.createPool(["wss://nostr.wine"]);
  let profile: user.UserProfile | null;
  let nip05 = "";
  onMount(async () => {
    await pool.ensure();
    profile = await user.getProfileFromNip05("borrakkor@nostrplebs.com", pool);
  });
  $: displayProfile = profile ? user.toDisplayProfile(profile) : null;
</script>

<div>
  <p>Your public key is {displayProfile?.pubkey}</p>
  <p>Your name is {displayProfile?.name}</p>
  <p>
    Your picture looks like this <img
      src={displayProfile?.picture}
      alt="profile"
    />
  </p>
</div>

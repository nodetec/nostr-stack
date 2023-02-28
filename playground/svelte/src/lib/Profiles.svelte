<script lang="ts">
  import { relay, user } from "@nostr-stack/core";
  import { onMount } from "svelte";

  const pool = relay.createPool([
    "wss://eden.nostr.land",
    "wss://nostr.wine",
    "wss://nos.lol",
  ]);
  let profiles: user.UserProfile[] = [];
  let input = "";
  let buttonDisabled = false;
  $: nip05s = input.split(", ");
  $: displayProfiles = profiles.map((p) => user.toDisplayProfile(p));

  onMount(async () => {
    await pool.ensure();
  });

  const getPubKeys = async () => {
    return (await (
      await Promise.all(nip05s.map((n) => user.getPublicKeyFromNip05(n)))
    ).filter((n) => !!n)) as string[];
  };

  const getProfiles = async () => {
    buttonDisabled = true;
    const pubKeys = await getPubKeys();
    const profiles = await user.getProfiles(pubKeys, pool);
    buttonDisabled = false;
    return profiles;
  };
</script>

<div>
  <form on:submit|preventDefault={async () => (profiles = await getProfiles())}>
    <label
      >Enter a Nip05 addresses
      <input type="text" bind:value={input} />
    </label>
    <button disabled={buttonDisabled}>Search</button>
  </form>
  <div class="profiles">
    {#each displayProfiles as profile}
      <p>Public key is {profile.pubkey}</p>
      <p>Name is {profile.name}</p>
      <p>Display name is {profile.display_name}</p>
      <p>
        Your picture looks like this <img src={profile.picture} alt="profile" />
      </p>
    {/each}
  </div>
</div>

<style>
  img {
    border-radius: 100%;
    height: 100px;
    width: 100px;
  }
  .profiles {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>

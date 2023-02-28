import { describe, it, expect } from "vitest";
import { getProfile, setProfile, verifyNip05 } from "./profile";
import { createPool } from "../relay";
import { generatePrivateKey, getPublicKey, nip19 } from "nostr-tools";

const sk = generatePrivateKey();

describe("package: profile", () => {
  it("should set a users profile", async () => {
    const relayPool = createPool(["ws://localhost:8080"]);
    await setProfile({ pubkey: getPublicKey(sk), name: "test" }, sk, relayPool);
    const profile = await getProfile(getPublicKey(sk), relayPool);
    expect(profile?.name).toBe("test");
  });

  it("should set a users profile with nip05", async () => {
    const relayPool = createPool(["ws://localhost:8080"]);
    await setProfile(
      { pubkey: getPublicKey(sk), name: "test", nip05: "test@example.com" },
      sk,
      relayPool
    );
    const profile = await getProfile(getPublicKey(sk), relayPool);
    expect(profile?.nip05).toBe("test@example.com");
  });

  it("should verify a valid nip05 name", async () => {
    const nip05 = "borrakkor@nostrplebs.com";
    const pubkey = nip19.decode(
      "npub1rach342hnt3wa0qfqk0pey0exs2drcxfc0azs8eurwnee9vu64vs834atg"
    ).data as string;
    const valid = await verifyNip05({
      nip05,
      name: "test",
      pubkey: pubkey,
    });
    expect(valid).toBe(true);
  });

  it("should not verify an invalid nip05 name", async () => {
    const valid = await verifyNip05({
      nip05: "jb55@jb55.com",
      name: "test",
      pubkey: getPublicKey(sk),
    });
    expect(valid).toBe(false);
  });
});

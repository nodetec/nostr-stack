import { user } from "@nostr-stack/core";
import { useEffect, useState } from "react";
import { useRelays } from "./relay";

export const useProfile = (pubkey: string) => {
  const relays = useRelays();
  const [profile, setProfile] = useState<user.UserProfile>(() =>
    user.toDisplayProfile({ pubkey, name: "" })
  );

  // This will not propagate to the network
  // Just updates the local cache and state value
  const updateProfile = (profile: user.UserProfile) => {
    setProfile(profile);
  };

  useEffect(() => {
    user.getProfile(pubkey, relays.pool).then((profile) => {
      if (profile) {
        setProfile(user.toDisplayProfile(profile));
      }
    });
  }, [relays.pool, pubkey]);

  return {
    profile,
    updateProfile,
  };
};

export const useProfiles = (pubkeys: string[]): user.UserProfile[] => {
  const relays = useRelays();
  const [profiles, setProfiles] = useState<user.UserProfile[]>([]);

  useEffect(() => {
    user.getProfiles(pubkeys, relays.pool).then((profiles) => {
      if (!profiles || !profiles.length) return;
      setProfiles((curr) => [...curr, ...profiles.map(user.toDisplayProfile)]);
    });
  }, [relays.pool, pubkeys]);

  return profiles;
};

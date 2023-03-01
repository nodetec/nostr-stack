import { user } from "@nostr-stack/core";
import { atom, useAtom } from "jotai";
import { compact } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRelays } from "./relay";

const STORAGE_KEY = "@nostr-react/profiles";

const createCacheAtom = (persist = false) =>
  atom<Record<string, user.UserProfile>>(() => {
    if (!persist) return {};
    const cached = localStorage.getItem(STORAGE_KEY);
    if (!cached) return {};
    return JSON.parse(cached);
  });

const useProfileCache = (persist = false, maxSize?: number) => {
  const cacheAtom = useMemo(() => createCacheAtom(persist), [persist]);
  const [cache] = useAtom(cacheAtom);
  const cacheRef = useRef(cache);

  const get = (key: string): user.UserProfile | null => {
    return cacheRef.current[key];
  };

  const set = (key: string, value: user.UserProfile) => {
    cacheRef.current[key] = value;
    if (persist) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cacheRef.current));
    }
  };

  return {
    get,
    set,
  };
};

type Options = {
  /** In memory cache can be used */
  cache?: boolean;
  /** Persist data to local storage */
  persist?: boolean;
};

export const useProfile = (
  pubkey: string,
  opts?: Options
): user.UserProfile => {
  const cache = useProfileCache(opts?.persist);
  const relays = useRelays();
  const [profile, setProfile] = useState<user.UserProfile>(() =>
    user.toDisplayProfile({ pubkey, name: "" })
  );

  useEffect(() => {
    if (cache.get(pubkey)) {
      setProfile(user.toDisplayProfile(cache.get(pubkey)!));
      return;
    }
    user.getProfile(pubkey, relays.pool).then((profile) => {
      if (profile) {
        if (opts?.cache) cache.set(pubkey, profile);
        setProfile(user.toDisplayProfile(profile));
      }
    });
  }, [relays.pool, pubkey]);

  return profile;
};

export const useProfiles = (
  pubkeys: string[],
  opts?: Options
): user.UserProfile[] => {
  const relays = useRelays();
  const cache = useProfileCache(opts?.persist);
  const [profiles, setProfiles] = useState<user.UserProfile[]>(() => {
    return compact(pubkeys.map((pubkey) => cache.get(pubkey)));
  });

  const setCacheHits = (pubkeys: string[]) => {
    const hits = pubkeys.filter((pubkey) => cache.get(pubkey));
    setProfiles(
      hits.map((pubkey) => user.toDisplayProfile(cache.get(pubkey)!))
    );
  };

  useEffect(() => {
    if (!opts?.cache) {
      user.getProfiles(pubkeys, relays.pool).then((profiles) => {
        if (!profiles || !profiles.length) return;
        setProfiles(profiles.map(user.toDisplayProfile));
      });
    }
    setCacheHits(pubkeys);
    const misses = pubkeys.filter((pubkey) => !cache.get(pubkey));
    if (!misses.length) return;
    user.getProfiles(misses, relays.pool).then((profiles) => {
      if (!profiles || !profiles.length) return;
      if (opts?.cache) {
        profiles.forEach((profile) => cache.set(profile.pubkey, profile));
      }
      setProfiles((curr) => [...curr, ...profiles.map(user.toDisplayProfile)]);
    });
  }, [relays.pool, pubkeys]);

  return profiles;
};

export type UserSettings = user.UserProfile;
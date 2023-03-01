import { useProfiles } from "@nostr-stack/react";
import { user } from "@nostr-stack/core";
import { useEffect, useState } from "react";

export const Profiles = () => {
  const [nip05s, setNip05s] = useState<string[]>(["borrakkor@nostrplebs.com"]);
  const [pubkeys, setPubkeys] = useState<string[]>([]);

  const search = () => {
    Promise.all(nip05s.map((p) => user.getPublicKeyFromNip05(p))).then(
      (pks) => {
        const nonNull = pks.filter((p) => !!p && p !== "") as string[];
        setPubkeys(nonNull);
      }
    );
  };

  const profiles = useProfiles(pubkeys, { cache: true, persist: true });
  return (
    <div>
      <div>
        <h4>Profiles</h4>
        <label>Nip05 Profiles</label>
        <textarea
          value={nip05s.join("\n")}
          style={{ width: 300 }}
          rows={10}
          onChange={(e) => setNip05s(e.target.value.split("\n"))}
        />
        <button onClick={search}>Search</button>
      </div>
      {profiles.map((p) => (
        <Profile userSettings={p} />
      ))}
    </div>
  );
};

const Profile = ({ userSettings }: { userSettings: user.UserProfile }) => {
  return (
    <div>
      <h4>Pubkey is {userSettings.pubkey}</h4>
      <h4>Name is {userSettings.name}</h4>
      <h4>{userSettings.about}</h4>
      {userSettings.picture && <img src={userSettings.picture} />}
    </div>
  );
};

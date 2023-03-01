import { useProfile } from "@nostr-stack/react";
export const Profile = () => {
  const profile = useProfile(
    "npub1rach342hnt3wa0qfqk0pey0exs2drcxfc0azs8eurwnee9vu64vs834atg",
    { cache: true, persist: true }
  );
  if (!profile) return <div>Loading...</div>;
  return (
    <div>
      <h4>Pubkey is {profile.pubkey}</h4>
      <h4>Name is {profile.name}</h4>
      <h4>{profile.about}</h4>
      {profile.picture && <img src={profile.picture} />}
    </div>
  );
};

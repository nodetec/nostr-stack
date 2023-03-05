import { useProfile } from "@nostr-stack/react";
import { ProfilePreview } from "@nostr-stack/ui";
export const Profile = () => {
  const { profile } = useProfile(
    "npub1rach342hnt3wa0qfqk0pey0exs2drcxfc0azs8eurwnee9vu64vs834atg",
    { cache: true, persist: true }
  );
  if (!profile) return <div>Loading...</div>;
  return (
    <div style={{ margin: "0 50px" }}>
      <ProfilePreview
        npub={profile.pubkey}
        name={profile.display_name}
        picture={profile.picture}
        about={profile.about}
      />
    </div>
  );
};

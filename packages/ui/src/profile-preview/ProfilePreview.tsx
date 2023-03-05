import Avatar from "../atoms/avatar/Avatar";
import { cva } from "class-variance-authority";
import Button from "../atoms/button";
import { FiCopy } from "react-icons/fi";

type Props = {
  npub: string;
  picture?: string;
  name?: string;
  about?: string;
  verfied?: boolean;
  nip05?: string;
  onProfileClick?: () => void;
};

const ProfilePreview = ({
  npub,
  picture,
  name,
  about,
  onProfileClick,
}: Props) => {
  const classes = profilePreview();
  const shortenedNpub = npub.slice(0, 6) + "..." + npub.slice(-6);

  const copyNpubToClipboard = () => {
    if (!navigator.clipboard) return;
    // TODO: Support this better
    navigator.clipboard.writeText(npub);
  };

  return (
    <div className={classes}>
      <div className="flex gap-x-4 items-center">
        <Avatar imgUrl={picture} size="lg" onClick={onProfileClick} />
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-x-2">
            <h4 className="text-lg">{name}</h4>
            <Button
              intent="secondary"
              size="xs"
              onClick={copyNpubToClipboard}
              compact
            >
              <div className="flex gap-x-1 items-center">
                <FiCopy />
                {shortenedNpub}
              </div>
            </Button>
          </div>
          {about && <p className="text-sm">{about}</p>}
          {!about && <p className="text-sm italic">No bio</p>}
        </div>
      </div>
    </div>
  );
};

const profilePreview = cva([
  "bg-slate-100",
  "dark:bg-gray-700",
  "dark:text-slate-100",
  "rounded-lg",
  "shadow-lg",
  "w-full",
  "p-4",
]);

export default ProfilePreview;

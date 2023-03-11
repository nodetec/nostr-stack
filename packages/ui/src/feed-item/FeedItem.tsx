import { type Event, type UserProfile, user } from "@nostr-stack/core";
import linkifyRegex from "remark-linkify-regex";
import { FaRetweet, FaReply, FaComment } from "react-icons/fa";
import {
  formatRelative,
  fromUnixTime,
  differenceInDays,
  format,
} from "date-fns";
import { cva } from "class-variance-authority";
import { useState } from "react";
import Avatar from "../atoms/avatar";
import ReactMarkdown from "react-markdown";

type Props = {
  note: Event;
  author?: UserProfile;
  onAuthorClick?: (pubkey: string) => void;
  compact?: boolean;
  onReply?: () => void;
  onRepost?: () => void;
  onComment?: () => void;
  numComments?: number;
};

const FeedItem = ({
  note,
  author,
  onAuthorClick,
  compact,
  onReply,
  onRepost,
  onComment,
  numComments,
}: Props) => {
  const [showMore, setShowMore] = useState(false);
  const classes = feedItem();
  const truncated =
    note.content.length > 200 ? note.content.slice(0, 200) : note.content;
  const displayPubKey =
    user.toDisplayPubkey(note.pubkey).slice(0, 8) +
    "..." +
    user.toDisplayPubkey(note.pubkey).slice(-8);
  const postedDate = fromUnixTime(note.created_at);
  const postedAt =
    differenceInDays(new Date(), postedDate) > 1
      ? format(postedDate, "M/d/yy h:mm a")
      : formatRelative(postedDate, new Date());

  return (
    <div className={classes}>
      <div className="flex gap-x-2 mb-4 items-center">
        <Avatar
          imgUrl={author?.picture}
          onClick={() => onAuthorClick?.(note.pubkey)}
        />
        <div>
          <h4 className="">{author?.display_name ?? displayPubKey}</h4>
          <h5 className="text-xs">{postedAt}</h5>
        </div>
      </div>
      {compact && (
        <div className="flex flex-col gap-y-2 flex-wrap">
          <div className="prose dark:prose-invert w-full">
            <MarkdownContent>
              {showMore ? note.content : truncated}
            </MarkdownContent>
            {note.content.length > 200 && (
              <span
                className="text-slate-500 dark:text-slate-400 cursor-pointer"
                onClick={() => setShowMore(!showMore)}
              >
                {" "}
                ...{showMore ? "less" : "more"}
              </span>
            )}
          </div>
        </div>
      )}
      {!compact && (
        <div className="flex gap-x-2 items-center w-full">
          <div className="flex flex-col gap-y-2 w-full">
            <div className="prose dark:prose-invert w-full">
              <MarkdownContent>{note.content}</MarkdownContent>
            </div>
          </div>
        </div>
      )}
      <div className="flex mt-4 justify-evenly">
        {onReply && (
          <button className="flex gap-x-3 items-center">
            <FaReply /> <span className="hidden md:block">Reply</span>
          </button>
        )}
        {onRepost && (
          <button className="flex gap-x-3 items-center">
            <FaRetweet />
            <span className="hidden md:block">Repost</span>
          </button>
        )}
        {onComment && (
          <button className="flex gap-x-3 items-center">
            <FaComment />
            <span className="">{numComments}</span>
          </button>
        )}
      </div>
    </div>
  );
};

const MarkdownContent = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown remarkPlugins={[linkifyRegex(/(https?:\/\/[^\s]+)/g)]}>
      {children}
    </ReactMarkdown>
  );
};

const feedItem = cva([
  "rounded-md p-4 dark:bg-slate-700 bg-slate-100 dark:text-slate-100 h-full shadow-md",
]);
export default FeedItem;

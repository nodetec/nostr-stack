import type { Meta, StoryObj } from "@storybook/react";

import FeedItem from "./FeedItem";

const meta = {
  title: "FeedItem",
  component: FeedItem,

  //👇 Enables auto-generated documentation for the component story
  tags: ["autodocs"],
} satisfies Meta<typeof FeedItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    note: {
      content:
        "Still believe it’s critical we have a credible permissionless alternative to GutHub (ideally based on nostr). One that bitcoin-core and all nostr devs would trust. \n\nMoving my bounty up from 120 million sats to 1 billion sats. \n\nhttps://bountsr.org/code/2023/01/19/nostr-based-github.html",
      created_at: 1677901780,
      id: "f213b7d9f083aa0c2c28cc54d0c67cff0bea6e416fcb306c70f1f700e94a695e",
      kind: 1,
      pubkey:
        "82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2",
      sig: "5750229f4cf8756686207939a71a06e2eff8602a68dc6aecb418368c5374241eb155a6b43ce2e4058102f1be4eb0ce569b7b7883558bec8b6f3c2f807d9aa48b",
      tags: [],
    },
    author: {
      name: "jack",
      display_name: "Jack",
      pubkey: "npub1sg6plzptd64u62a878hep2kev88swjh3tw00gjsfl8f237lmu63q0uf63m",
      picture:
        "https://imgproxy.iris.to/insecure/plain/https://nostr.build/i/p/nostr.build_6b9909bccf0f4fdaf7aacd9bc01e4ce70dab86f7d90395f2ce925e6ea06ed7cd.jpeg",
    },
    onReply: () => console.log("onReply"),
    onAuthorClick: () => console.log("onAuthorClick"),
    onRepost: () => console.log("onRepost"),
    onComment: () => console.log("onComment"),
    numComments: 100,
  },
};

export const WithMarkdown: Story = {
  args: {
    ...Basic.args,
    note: {
      ...Basic.args.note,
      content:
        "# This is a header\n This is some text under the header \n ## Sub header",
    },
  },
};

import type { Meta, StoryObj } from "@storybook/react";

import ProfilePreview from "./ProfilePreview";

const meta = {
  title: "ProfilePreview",
  component: ProfilePreview,

  //👇 Enables auto-generated documentation for the component story
  tags: ["autodocs"],
} satisfies Meta<typeof ProfilePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    npub: "npub1rach342hnt3wa0qfqk0pey0exs2drcxfc0azs8eurwnee9vu64vs834atg",
    name: "Display Name",
    picture:
      "https://nostr.build/i/p/nostr.build_b8a064cfdff3359dd6a02fe3fb20f2525abe61479db66659cc978a6008b262d0.jpeg",
    onProfileClick: () => console.log("onProfileClick"),
  },
};

export const WithBio: Story = {
  args: {
    ...Basic.args,
    about: "This is an about me description taken from a kind 0 event",
  },
};

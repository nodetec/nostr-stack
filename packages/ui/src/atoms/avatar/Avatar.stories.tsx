import type { Meta, StoryObj } from "@storybook/react";

import Avatar from "./Avatar";

const meta = {
  title: "Atoms/Avatar",
  component: Avatar,

  //👇 Enables auto-generated documentation for the component story
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const WithPicture: Story = {
  args: {
    imgUrl:
      "https://nostr.build/i/p/nostr.build_b8a064cfdff3359dd6a02fe3fb20f2525abe61479db66659cc978a6008b262d0.jpeg",
  },
};

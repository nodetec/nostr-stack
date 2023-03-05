import type { Meta, StoryObj } from "@storybook/react";

import RelayToggleList from "./RelayToggleList";

const meta = {
  title: "RelayToggleList",
  component: RelayToggleList,

  //👇 Enables auto-generated documentation for the component story
  tags: ["autodocs"],
} satisfies Meta<typeof RelayToggleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    relays: [
      { url: "wss://eden.nostr.land", toggled: true },
      { url: "wss://nostr.wine", toggled: false },
      { url: "wss://nos.lol", toggled: true },
      { url: "wss://relay.damus.io", toggled: false },
    ],
    onRelayChange: (relay, toggled) => console.log(relay, toggled),
  },
};

import type { Meta, StoryObj } from "@storybook/react";

import Toggle from "./Toggle";

const meta = {
  title: "Toggle",
  component: Toggle,

  //👇 Enables auto-generated documentation for the component story
  tags: ["autodocs"],

  argTypes: {
    onChange: { action: "onChange" },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onChange: (value) => console.log(`Toggle is ${value ? "on" : "off"}`),
    state: true,
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    state: false,
  },
};

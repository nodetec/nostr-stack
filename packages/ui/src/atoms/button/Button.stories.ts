import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

const meta = {
  title: "Atoms/Button",
  component: Button,

  //👇 Enables auto-generated documentation for the component story
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    intent: "primary",
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    intent: "secondary",
  },
};

export const Danger: Story = {
  args: {
    ...Primary.args,
    intent: "danger",
  },
};

export const Small: Story = {
  args: {
    ...Primary.args,
    size: "sm",
  },
};

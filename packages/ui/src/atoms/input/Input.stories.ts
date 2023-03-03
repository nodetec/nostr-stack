import type { Meta, StoryObj } from "@storybook/react";

import Input from "./Input";

const meta = {
  title: "Input",
  component: Input,

  //👇 Enables auto-generated documentation for the component story
  tags: ["autodocs"],

  argTypes: {
    onChange: { action: "onChange" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: "Title",
    name: "title",
    onChange: (t) => console.log("onChange", t),
    placeholder: "Enter title",
    type: "text",
  },
};

export const Password: Story = {
  args: {
    ...Basic.args,
    type: "password",
    value: "hunter2",
  },
};

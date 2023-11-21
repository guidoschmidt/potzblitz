import { Button } from "../lib/Button";

const meta = {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
  },
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Primary = {
  args: {
    label: "Button Text",
  },
};

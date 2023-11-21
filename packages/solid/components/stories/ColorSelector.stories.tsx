import { ColorSelector } from "../lib";

const meta = {
  title: "Example/ColorSeloctor",
  component: ColorSelector,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
  },
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Primary = {
  args: {
    label: "Color Selector",
    value: "#ff00ff",
  },
};

import { ColorPicker } from "../lib/ColorPicker";

const meta = {
  title: "Example/ColorPicker",
  component: ColorPicker,
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
    label: "Color Picker",
    value: "#ff00ff",
  },
};

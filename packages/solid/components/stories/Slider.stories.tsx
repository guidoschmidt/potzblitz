import { Slider } from "../lib";

const meta = {
  title: "Example/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    value: { control: "number" },
  },
};

export default meta;

export const SliderExample = {
  args: {
    label: "Label",
    value: 100,
  },
};

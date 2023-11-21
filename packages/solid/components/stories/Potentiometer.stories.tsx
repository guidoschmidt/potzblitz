import { Potentiometer } from "../lib";

const meta = {
  title: "Example/Potentiometer",
  component: Potentiometer,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    value: { control: "number" },
  },
};

export default meta;

export const PotentiometerExample = {
  args: {
    label: "Label",
    value: 0,
  },
};

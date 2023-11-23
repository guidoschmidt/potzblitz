import { NumberInputField } from "../lib";

const meta = {
  title: "Example/NumberInputField",
  component: NumberInputField,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    value: { control: "number" },
  },
};

export default meta;

export const NumberInput = {
  args: {
    label: "Number Input",
    value: 42,
  },
};

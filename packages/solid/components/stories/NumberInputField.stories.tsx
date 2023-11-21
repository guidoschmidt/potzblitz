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

export const StringInput = {
  args: {
    label: "String",
    value: 42,
  },
};

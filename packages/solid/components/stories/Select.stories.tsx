import { Select } from "../lib";

const meta = {
  title: "Example/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    options: { control: "array" },
  },
};

export default meta;

export const SelectExample = {
  args: {
    label: "String",
    options: [1, 2, 3],
  },
};

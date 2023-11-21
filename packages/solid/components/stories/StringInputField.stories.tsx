import { StringInputField } from "../lib";

const meta = {
  title: "Example/StringInputField",
  component: StringInputField,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
  },
};

export default meta;

export const StringInput = {
  args: {
    label: "String",
    value: "Text",
  },
};

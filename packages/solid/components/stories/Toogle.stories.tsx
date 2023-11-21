import { Toggle } from "../lib";

const meta = {
  title: "Example/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    value: { control: "boolean" },
  },
};

export default meta;

export const ToggleExample = {
  args: {
    label: "Label",
    value: false,
  },
};

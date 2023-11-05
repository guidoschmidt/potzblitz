import "@potzblitz/components/src/scss/InputField.scss";
import type { Stream } from "@thi.ng/rstream";

export interface StringInputProps {
  label: string;
  onInput: (v: string) => any;
  value: Stream<string>;
}

export function StringInputField(props: StringInputProps) {
  return [
    "div.inputfield",
    {},
    ["label", {}, props.label],
    [
      "input",
      {
        value: props.value,
        oninput: (e: InputEvent) =>
          props.onInput((e.target as HTMLInputElement).value),
      },
    ],
  ];
}

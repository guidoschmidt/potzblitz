import "@potzblitz/components/src/scss/InputField.scss";
import type { Stream } from "@thi.ng/rstream";

export interface NumberInputFieldProps {
  label: string;
  max: number;
  min: number;
  onInput: (v: number) => any;
  step: number;
  value: Stream<number>;
}

export function NumberInputField(props: NumberInputFieldProps) {
  return [
    "div.inputfield",
    {},
    [
      "label",
      {
        style: {
          display: props.label === undefined ? "none" : "inherit",
        },
      },
      props.label,
    ],
    [
      "div.input-wrapper",
      {},
      [
        "button.button.step-button",
        {
          onclick: () =>
            props.onInput((props?.value?.deref() ?? 0) - (props.step ?? 1)),
        },
        "-",
      ],
      [
        "input",
        {
          type: "number",
          value: props.value,
          oninput: (e: InputEvent) =>
            props.onInput(parseFloat((e?.target as HTMLInputElement)?.value)),
        },
      ],
      [
        "button.button.step-button",
        {
          onclick: (e: InputEvent) =>
            props.onInput((props?.value?.deref() ?? 0) + (props.step ?? 1)),
        },
        "+",
      ],
    ],
  ];
}

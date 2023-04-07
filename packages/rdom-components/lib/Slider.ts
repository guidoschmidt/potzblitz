import "@potzblitz/components/src/scss/Slider.scss";
import { NumberInputField, NumberInputFieldProps } from "./";
import type { Stream } from "@thi.ng/rstream";

export interface SliderProps {
  label: string;
  max: number;
  min: number;
  onInput: (v: number) => any;
  step: number;
  value: Stream<number>;
}

export function Slider(props: SliderProps) {
  return [
    "div.slider",
    {},
    ["label", {}, props.label],
    [
      "div.slider-wrap",
      {},
      [
        "input",
        {
          type: "range",
          min: props.min,
          max: props.max,
          step: props.step,
          value: props.value,
          oninput: (e: InputEvent) =>
            props.onInput(parseFloat((e.target as HTMLInputElement)?.value)),
        },
      ],
      NumberInputField({
        value: props.value,
        min: props.min,
        max: props.max,
        step: props.step,
        onInput: (v: number) => props.onInput(v),
      } as NumberInputFieldProps),
    ],
  ];
}

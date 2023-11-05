import "@potzblitz/components/src/scss/ColorPicker.scss";
import type { Stream } from "@thi.ng/rstream";
import { uuid } from "@thi.ng/random";

export interface ColorPickerProps {
  label?: string;
  value: Stream<string>;
  onSelect: (c: string) => any;
}

export function ColorPicker(props: ColorPickerProps) {
  const id = uuid();
  return [
    "div.colorpicker",
    {},
    ["label", {}, props.label],
    [
      "input.input",
      {
        id,
        type: "color",
        value: props.value,
        onchange: (e: InputEvent) => {
          props.onSelect((e.target as HTMLInputElement)?.value);
        },
      },
    ],
    [
      "label.color-preview-wrapper",
      {
        for: id,
      },
      [
        "div.color-preview",
        {
          style: {
            background: props.value,
          },
        },
      ],
    ],
  ];
}

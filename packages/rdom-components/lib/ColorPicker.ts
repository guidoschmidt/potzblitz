import "@potzblitz/components/src/scss/ColorPicker.scss";
import type { Stream } from "@thi.ng/rstream";

export interface ColorPickerProps {
  label?: string;
  value: Stream<string>;
  onSelect: (c: string) => any;
}

export function ColorPicker(props: ColorPickerProps) {
  return [
    "div.colorpicker",
    {},
    ["label", {}, props.label],
    [
      "input.input",
      {
        id: props.label,
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
        for: props.label,
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

import "../scss/ColorPicker.scss";
import { View } from "@thi.ng/atom";
import { ValueView } from "./blocks";
import { camelCaseWithSpaces, ColorPickerProps } from "../api";

interface hdomColorPickerProps extends ColorPickerProps {
  value: View<string>;
  id: string;
}

function ColorPicker(props: hdomColorPickerProps) {
  return () => {
    const handleInput = (e: InputEvent) => {
      const target = e.target as HTMLInputElement;
      const newValue = target.value;
      props.onSelect && props.onSelect(newValue);
    };

    return [
      "div.colorpicker",
      [props.label && ["label", camelCaseWithSpaces(props.label)]],
      [
        `input#${props.id}.input`,
        { type: "color", value: props.value.deref(), oninput: handleInput },
      ],
      [
        "label.color-preview-wrapper",
        { for: `${props.id}` },
        [
          "div.color-preview",
          {
            style: {
              background: props.value.deref(),
            },
          },
        ],
      ],
      ValueView(props.value.deref()),
    ];
  };
}

export { ColorPicker };

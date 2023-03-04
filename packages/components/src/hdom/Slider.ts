import "../scss/Slider.scss";
import { type View } from "@thi.ng/atom";
import { camelCaseWithSpaces, SliderProps } from "../api";
import { ValueView } from "./blocks";

interface hdomSliderProps extends SliderProps {
  value: View<number>;
}

function Slider(props: hdomSliderProps) {
  return () => {
    const handleInput = (e: InputEvent) => {
      const target = e.target as HTMLInputElement;
      const newValue = parseFloat(target.value);
      props.onUpdate && props.onUpdate(newValue);
    };

    return [
      "div.slider",
      [
        ["label", camelCaseWithSpaces(props.label ?? "Slider")],
        [
          "input",
          {
            type: "range",
            value: props.value.deref(),
            min: props.min ?? 0,
            max: props.max ?? 100,
            step: props.step ?? 1,
            oninput: handleInput,
          },
        ],
        ValueView(props.value.deref()),
      ],
    ];
  };
}

export { Slider };

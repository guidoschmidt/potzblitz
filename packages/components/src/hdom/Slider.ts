import "../scss/Slider.scss";
import { type View } from "@thi.ng/atom";
import { camelCaseWithSpaces, SliderProps } from "../api";
import { ValueView } from "./blocks";

interface hdomSliderProps extends SliderProps {
  style: object;
  value: View<number>;
}

function Slider(props: hdomSliderProps) {
  return () => {
    const handleInput = (e: InputEvent) => {
      const target = e.target as HTMLInputElement;
      const value = parseFloat(target.value);
      const div = props.step ? Math.pow(10, `${props.step}`.length - 2) : 1000;
      const fixedValue = Math.floor(value * div) / div;
      props.onUpdate && props.onUpdate(fixedValue);
    };

    return [
      "div.slider",
      { style: { ...props.style } },
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

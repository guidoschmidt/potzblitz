import "../scss/Slider.scss";
import h from "hyperscript";
import { camelCaseWithSpaces, SliderProps } from "../api";
import { createSignal } from "./reactive";
import { CopyValueButton, AdditionalValueInput } from "./blocks";

export function Slider(props: SliderProps, ctx?: object) {
  const [vO, setVO] = createSignal(parseFloat(`${props.value}` || "0.0"));

  vO((v: number) => {
    if (ctx) ctx[props.label] = v;
    props.onUpdate && props.onUpdate(v);
  });

  const handleInput = (e: InputEvent) => {
    const target = e.target as HTMLInputElement;
    const newValue = parseFloat(target.value);
    setVO(newValue);
  };

  return h("div.slider", [
    h("label", camelCaseWithSpaces(props.label)),
    h("input", {
      type: "range",
      value: props.value || 0,
      oninput: (e: InputEvent) => handleInput(e),
      min: props.min || 0,
      max: props.max || 100,
      step: props.step || 1,
    }),
    AdditionalValueInput({ value: vO }),
    CopyValueButton({ value: vO }),
  ]);
}

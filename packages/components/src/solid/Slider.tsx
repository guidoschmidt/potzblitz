import "../scss/Slider.scss";
import { mergeProps, createSignal, createEffect } from "solid-js";
import { SliderPros, uniqueName } from "../api";
import { CopyValueButton, AdditionalValueInput } from "./blocks";

export function Slider(props: SliderPros) {
  const mprops: SliderPros = mergeProps(
    {
      value: 0,
      min: 0,
      max: 100,
      step: 1,
      onUpdate: () => {},
      onBlur: () => {},
      showCopyButton: false,
    },
    props
  );

  const [idStr, _id] = uniqueName(mprops.label);
  const [vO, setVO] = createSignal(mprops.value);

  const handleInput = (e: InputEvent): number => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const newValue = parseFloat(value);
    setVO(newValue);
    return newValue;
  };

  createEffect(() => {
    setVO(mprops.value);
  });

  return (
    <div className="slider" id={idStr}>
      {mprops.label && <label>{mprops.label}</label>}
      <input
        type="range"
        value={vO()}
        min={mprops.min}
        max={mprops.max}
        step={mprops.step}
        onInput={(e: InputEvent) => mprops.onUpdate(handleInput(e))}
        onPointerUp={(e: InputEvent) => mprops.onBlur(handleInput(e))}
      />
      <AdditionalValueInput value={vO()} />
      {mprops.showCopyButton && <CopyValueButton value={vO()} />}
    </div>
  );
}

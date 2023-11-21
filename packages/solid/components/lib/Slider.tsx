// import "@potzblitz/styles/lib/components/Slider.scss";
import { SliderProps, uniqueName } from "@potzblitz/api";
import { mergeProps, createSignal, createEffect } from "solid-js";
import { CopyValueButton, ValueView } from "./blocks";

export function Slider(props: SliderProps) {
  const mprops: SliderProps = mergeProps(
    {
      value: 0,
      min: 0,
      max: 100,
      step: 1,
      onUpdate: () => {},
      onBlur: () => {},
      showCopyButton: false,
    },
    props,
  );

  const [idStr, _id] = uniqueName(mprops.label);
  const [vO, setVO] = createSignal(mprops.value);

  const handleInput = (e: InputEvent | PointerEvent): number => {
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
    <div classList={{ slider: true, ...mprops.classList }} id={idStr}>
      {mprops.label && <label>{mprops.label}</label>}
      <div class="slider-wrap">
        <input
          type="range"
          value={vO()}
          min={mprops.min}
          max={mprops.max}
          step={mprops.step}
          onInput={(e: InputEvent) =>
            mprops.onUpdate && mprops.onUpdate(handleInput(e))
          }
          onPointerUp={(e: PointerEvent) =>
            mprops.onBlur && mprops.onBlur(handleInput(e))
          }
        />
        <ValueView value={vO()} />
      </div>
      {mprops.showCopyButton && <CopyValueButton value={vO()} />}
    </div>
  );
}

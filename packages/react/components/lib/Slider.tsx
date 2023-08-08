import "@potzblitz/styles/lib/components/Slider.scss";
import React, { useState, useEffect } from "react";
import { api } from "@potzblitz/components";
import { AdditionalValueInput } from "./blocks";

export function Slider(props: api.SliderProps) {
  const [idStr, _id] = api.uniqueName(props.label);
  const [vO, setVO] = useState<number>(props.value);

  useEffect(() => {
    setVO(props.value);
  }, [props.value]);

  const handleInput = (e: InputEvent): number => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const newVO = parseFloat(value);
    setVO(newVO);
    return newVO;
  };

  return (
    <div className="slider" id={idStr}>
      {props.label && <label htmlFor={idStr}>{props.label}</label>}
      <input
        type="range"
        id={idStr}
        value={vO}
        min={props.min || 0}
        max={props.max || 100}
        step={props.step || 1}
        onInput={(e: InputEvent) => {
          const v = handleInput(e);
          props.onUpdate && props.onUpdate(v);
        }}
        onPointerUp={(e: InputEvent) => {
          const v = handleInput(e);
          props.onBlur && props.onBlur(v);
        }}
      />
      <AdditionalValueInput value={vO} />
    </div>
  );
}

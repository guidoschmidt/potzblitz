import "@potzblitz/components/src/scss/ColorSelector.scss";
import React, { useState } from "react";
import { uniqueName } from "@potzblitz/components/src/api";

export interface ColorSelectorProps {
  label?: string;
  value: string;
  onSelect: (c: string) => any;
}

export function ColorSelector(props: ColorSelectorProps) {
  // const colorValues = reactive<number[]>([50, 50, 50]);
  // const dragValues = reactive([false, false, false, false]);
  const [idStr, _id] = uniqueName(props.label);

  const [showTool, setShowTool] = useState(false);
  const [colorValues, setColorValues] = useState([50, 50, 50]);
  const [dragValues, setDragValues] = useState([false, false, false, false]);

  // const triggerSelect = () => {
  //   const colorVal = css(rgb(hsv(colorValues.deref())));
  //   props.onSelect && props.onSelect(colorVal);
  // };

  // const updateKnob = (target: HTMLDivElement, v: number) => {
  //   const knob = target.querySelector(".knob");
  //   if (knob) {
  //     $style(knob, {
  //       left: `${v * 100}%`,
  //     });
  //   }
  // };

  // const updateCssColorVar = (target: HTMLElement) => {
  //   const el = target.closest(".colorselector");
  //   if (el) {
  //     el.style.setProperty(
  //       "--hue-current",
  //       `${Math.round(colorValues.deref()[0] * 360)} `
  //     );
  //   }
  // };

  return (
    <div className="colorselector" id={idStr}>
      {props.label && <label>{props.label}</label>}
      <div
        className="color-preview-wrapper"
        onPointerUp={() => setShowTool(true)}
      >
        <div className="color-preview" style={{ background: props.value }} />
        {showTool && (
          <div className="tool hidden">
            <div className="preview">
              <button className="button" onClick={() => setShowTool(false)}>
                ×
              </button>
            </div>
            <div
              className="panel"
              onPointerDown={() => setDragValues([true, false, false, false])}
              onPointerUp={() => {
                setDragValues([false, false, false, false]);
                props.onSelect?.(colorValues);
              }}
              onPointerLeave={() => setDragValues([false, false, false, false])}
              onPointerMove={(e: PointerEvent) => {
                if (!dragValues[0]) return;
                const target = e.target as HTMLDivElement;
                const { clientX, clientY } = e;
                const { left, top, width, height } =
                  target.getBoundingClientRect();
                const sat = (clientX - left) / width;
                const val = 1.0 - (clientY - top) / height;
                setColorValues([colorValues[0], sat, val]);
              }}
            >
              <div className="color" />
              <div
                className="selection"
                style={{
                  left: `${colorValues[1] * 100}%`,
                  top: `${100 - colorValues[2] * 100}%`,
                }}
              />
            </div>
            <div className="control hue">
              <div className="knob" />
            </div>
            <div className="control sat">
              <div className="knob" />
            </div>
            <div
              className="control val"
              onPointerDown={(e: PointerEvent) => {
                setDragValues([false, false, false, true]);
                const target = e.target as HTMLDivElement;
                const { clientX } = e;
                const { left, width } = target.getBoundingClientRect();
                const val = (clientX - left) / width;
                const [h, s, _] = colorValues;
                setColorValues([h, s, val]);
              }}
              onPointerUp={() => setDragValues([false, false, false, false])}
              onPointerLeave={() => setDragValues([false, false, false, false])}
              onPointerMove={(e: PointerEvent) => {
                if (!dragValues[3]) return;
                const target = e.target as HTMLDivElement;
                const { clientX } = e;
                const { left, width } = target.getBoundingClientRect();
                const val = (clientX - left) / width;
                const [h, s, _] = colorValues;
                setColorValues([h, s, val]);
                props.onSelect?.(colorValues);
                // updateKnob(target, val);
                // updateCssColorVar(target);
                // triggerSelect();
              }}
            >
              <div
                className="knob"
                style={{ left: `${colorValues[2] * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import "@potzblitz/components/src/scss/Potentiometer.scss";
import React, { useState, useRef } from "react";
import { api } from "@potzblitz/components";
import { AdditionalValueInput } from "./blocks";

export function Potentiometer(props: api.PotentiometerProps) {
  const [idStr, _id] = api.uniqueName(props.label);
  const [vO, setVO] = useState(props.value % 100.0);
  const [isDragging, setIsDragging] = useState(false);
  const knobWrapperRef = useRef<HTMLDivElement>();

  const onPointerMove = (e: PointerEvent) => {
    if (!isDragging) return;
    const knobWrapper = knobWrapperRef.current;
    const { width, height, x, y } = knobWrapper.getBoundingClientRect();
    const xRel = width * 0.5 - (e.clientX - x);
    const yRel = height * 0.5 - (e.clientY - y);
    const vec = [-xRel, yRel];
    const length = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1]);
    if (length < 5.0) return;
    const angle = Math.round(
      ((Math.atan2(vec[0], vec[1]) + Math.PI) * (180 / Math.PI)) / 3.6
    );
    setVO(angle);
    props.onUpdate && props.onUpdate(angle);
  };

  const onPointerDown = () => setIsDragging(true);

  const onPointerUp = () => setIsDragging(false);

  return (
    <div className="potentiometer" id={idStr}>
      {props.label && <label>{props.label}</label>}
      <div
        className="knob-wrapper"
        ref={knobWrapperRef}
        onPointerMove={onPointerMove}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div className="knob" style={{ transform: `rotate(${vO * 3.6}deg)` }}>
          <div className="angle-indicator" />
        </div>
      </div>
      <AdditionalValueInput value={vO} />
    </div>
  );
}

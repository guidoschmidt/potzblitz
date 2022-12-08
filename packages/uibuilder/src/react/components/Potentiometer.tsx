import { useState } from "react";
import { camelCaseWithSpaces, uuid } from "../../utils";
import "scss.ui.toolkit/6-components/_potentiometer.scss";

export function Potentiometer({ name, value }) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="ui-container potentiometer" id={`${name}-${uuid()}`}>
      <label>{camelCaseWithSpaces(name)}</label>
      <div className="knob-wrapper">
        <div
          className="knob"
          style={{
            transform: `rotate(${value * 3.6}deg)`,
          }}
        >
          <div className="angle-indicator" />
        </div>
      </div>
    </div>
  );
}

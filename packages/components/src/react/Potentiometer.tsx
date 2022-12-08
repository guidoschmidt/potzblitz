import React from "https://cdn.skypack.dev/react";
import "../scss/Potentiometer.scss";

export function Potentiometer() {
  return (
    <div className="potentiometer">
      <div className="knob-wrapper">
        <div className="knob">
          <div className="angle-indicator"></div>
        </div>
      </div>
    </div>
  );
}

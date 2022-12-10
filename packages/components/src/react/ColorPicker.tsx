import React from "https://cdn.skypack.dev/react";
import "../scss/ColorPicker.scss";

export function ColorPicker() {
  return [
    <div className="colorpicker">
      <input id="color" type="color" value="" />
      <label className="color-preview-wrapper" htmlFor="color">
        <div className="color-preview" style={{ "background-color": "#000" }} />
      </label>
    </div>,
  ];
}

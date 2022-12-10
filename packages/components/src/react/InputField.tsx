import React from "https://cdn.skypack.dev/react";
import "../scss/InputField.scss";

export function InputField() {
  return (
    <div class="inputfield">
      <input class="input" name="" type="text" value="" />
      <button class="button copy-value">●</button>
    </div>
  );
}

import "../scss/Select.scss";
import React, { useState } from "react";
import { SelectProps, uniqueName } from "../api";

export function Select<T>(props: SelectProps<T>) {
  const [idStr, _id] = uniqueName(props.label);
  const [vO, setVO] = useState(props.value);
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (option: T) => {
    const idx = props.options.indexOf(option);
    props.onSelect && props.onSelect(idx);
    setVO(idx);
    setShowOptions(false);
  };

  return (
    <div className="select" id={idStr}>
      {props.label && <label for={idStr}>{props.label}</label>}
      <div className="selected" onClick={() => setShowOptions(!showOptions)}>
        {props.options[vO]}
      </div>
      <div className={["options", !showOptions && "hidden"].join(" ")}>
        {props.options.map((option: T) => {
          return (
            <div
              className={[
                "option",
                option === props.options[vO] && "hidden",
              ].join(" ")}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
}

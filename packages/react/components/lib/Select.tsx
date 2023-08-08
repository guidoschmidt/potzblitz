import "@potzblitz/styles/lib/components/Select.scss";
import React, { useState } from "react";
import { api } from "@potzblitz/components";

export function Select<T>(props: api.SelectProps<T>) {
  const [idStr, _id] = api.uniqueName(props.label);
  const [vO, setVO] = useState(props.value);
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (option: T) => {
    const idx = props.options.indexOf(option);
    props.onSelect && props.onSelect(option, idx);
    setVO(idx);
    setShowOptions(false);
  };

  return (
    <div className="select" id={idStr}>
      {props.label && <label htmlFor={idStr}>{props.label}</label>}
      <div className="selected" onClick={() => setShowOptions(!showOptions)}>
        {props.displayFn
          ? props.displayFn(props.options[vO])
          : props.options[vO]}
      </div>
      <div className={["options", !showOptions && "hidden"].join(" ")}>
        {props.options
          .filter((o) => o !== props.options[vO])
          .map((option: T) => {
            return (
              <div
                key={option}
                className="option"
                onClick={() => handleSelect(option)}
              >
                {props.displayFn ? props.displayFn(option) : option}
              </div>
            );
          })}
      </div>
    </div>
  );
}

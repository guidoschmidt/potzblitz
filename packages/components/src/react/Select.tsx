import "../scss/Select.scss";
import React, { useState } from "react";
import { SelectProps } from "../api";

export function Select<T>(props: SelectProps<T>) {
  const [vO, setVO] = useState<number>(props.value);
  const [showOptionsO, setShowOptionsO] = useState(false);

  const handleSelect = (option: T) => {
    const idx = props.options.indexOf(option);
    props.onSelect && props.onSelect(idx);
    setVO(idx);
    setShowOptionsO(false);
  };

  return (
    <div className="select">
      {props.label && <label for="">{props.label}</label>}
      <div className="selected" onClick={() => setShowOptionsO(!showOptionsO)}>
        {props.options[vO]}
      </div>
      <div className={["options", !showOptionsO && "hidden"].join(" ")}>
        {props.options.map((option: T) => {
          return (
            <div
              classList={{
                option: true,
                hidden: option === props.options[vO],
              }}
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

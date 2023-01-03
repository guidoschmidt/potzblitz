import "../scss/Toggle.scss";
import React, { useState, useEffect } from "react";
import { camelCaseWithSpaces, ToggleProps } from "../api";

export function Toggle(props: ToggleProps) {
  const [vO, setVO] = useState<boolean>(props.value);

  useEffect(() => {
    setVO(props.value);
  }, [props.value]);

  const handleSwitch = () => {
    const newValue = !vO;
    setVO(newValue);
    props.onChange && props.onChange(newValue);
  };

  return (
    <div className="toggle">
      {props.label && <label>{camelCaseWithSpaces(props.label)}</label>}
      <div className="knob" onClick={handleSwitch}>
        <div className={["state", vO && "on"].join(" ")}>
          <input type="checkbox" value={vO} />
        </div>
      </div>
    </div>
  );
}

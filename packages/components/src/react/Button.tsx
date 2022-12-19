import "../scss/Button.scss";
import React from "react";
import { ButtonProps, camelCaseWithSpaces } from "../api";

export function Button(props: ButtonProps) {
  return (
    <button className="button" onClick={props.onClick}>
      {camelCaseWithSpaces(props.label ?? "Button")}
    </button>
  );
}

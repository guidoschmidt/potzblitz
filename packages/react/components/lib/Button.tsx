import "@potzblitz/components/src/scss/Button.scss";
import React from "react";
import { api } from "@potzblitz/components";

export function Button(props: api.ButtonProps) {
  return (
    <button className="button" onClick={props.onClick}>
      {api.camelCaseWithSpaces(props.label ?? "Button")}
    </button>
  );
}

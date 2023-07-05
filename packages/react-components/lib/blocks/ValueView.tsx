import "@potzblitz/components/src/scss/blocks/ValueView.scss";
import React from "react";

export function AdditionalValueInput(props: { value: number }) {
  return <span className="additional-value-input">{props.value}</span>;
}

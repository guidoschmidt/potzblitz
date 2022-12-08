import "../scss/Button.scss";
import { mergeProps } from "solid-js";
import { ButtonProps, camelCaseWithSpaces } from "../api";

export function Button(props: ButtonProps) {
  const mprops = mergeProps({ label: "", onClick: () => {} }, props);
  return (
    <button class="button" onClick={props?.onClick}>
      {camelCaseWithSpaces(mprops.label)}
    </button>
  );
}

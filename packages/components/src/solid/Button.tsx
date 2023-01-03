import "../scss/Button.scss";
import { mergeProps } from "solid-js";
import { ButtonProps, camelCaseWithSpaces } from "../api";

export function Button(props: ButtonProps) {
  const mprops = mergeProps(
    { label: "", onClick: () => {}, classList: {} },
    props
  ) as ButtonProps;
  return (
    <button
      classList={{ button: true, ...mprops.classList }}
      onClick={props?.onClick}
    >
      {camelCaseWithSpaces(mprops.label)}
    </button>
  );
}

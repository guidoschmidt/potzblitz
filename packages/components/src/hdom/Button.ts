import "../scss/Button.scss";
import { camelCaseWithSpaces, ButtonProps } from "../api";

function Button(props: ButtonProps) {
  return () => {
    return [
      "button.button",
      { onclick: props.onClick },
      camelCaseWithSpaces(props.label ?? "Button"),
    ];
  };
}

export { Button };

import "../scss/Button.scss";
import { camelCaseWithSpaces, ButtonProps } from "../api";

interface hdomBottonProps extends ButtonProps {
  style: object;
}

function Button(props: hdomBottonProps) {
  return () => {
    return [
      "div.button-wrapper",
      { style: { ...props.style } },
      [
        "button.button",
        { onclick: props.onClick },
        camelCaseWithSpaces(props.label ?? "Button"),
      ],
    ];
  };
}

export { Button };

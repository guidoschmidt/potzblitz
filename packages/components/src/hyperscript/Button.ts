import "../scss/Button.scss"
import h from "hyperscript";
import { camelCaseWithSpaces, ButtonProps } from "../api";

export function Button({
  label,
  onClick,
  ctx,
}: ButtonProps): HTMLElement {
  return h("button.button",
           { onclick: onClick && onClick.bind(ctx) },
           camelCaseWithSpaces(label))
}

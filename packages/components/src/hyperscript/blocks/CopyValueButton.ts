import "../../scss/blocks/CopyValueButton.scss";
import h from "hyperscript"
import { copyValue } from "../../api";

export function CopyValueButton(props: { value: any }) {
  return h("button.button.copy-value", {onclick: (e) => copyValue(e, props.value())}, "●")
}

import "../../scss/blocks/AdditionalValueInput.scss";
import h from "hyperscript";

export function AdditionalValueInput(props: { value: any }) {
  return h("span.additional-value-input", {}, props.value);
}

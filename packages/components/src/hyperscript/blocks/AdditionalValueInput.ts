import "../../scss/blocks/ValueView.scss";
import h from "hyperscript";

export function AdditionalValueInput(props: { value: any }) {
  return h("span.value-view", {}, props.value);
}

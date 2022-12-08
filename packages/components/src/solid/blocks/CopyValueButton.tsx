import "../../scss/blocks/CopyValueButton.scss";
import { copyValue } from "../../api";

export function CopyValueButton(props: { value: any }) {
  return (
    <button
      class="button copy-value"
      onClick={(e) => copyValue(e, props.value)}
    >
      ●
    </button>
  );
}

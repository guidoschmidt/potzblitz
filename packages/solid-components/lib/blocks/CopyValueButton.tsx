import "@potzblitz/components/src/scss/blocks/CopyValueButton.scss";
import { copyValue } from "@potzblitz/components/src/api";

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

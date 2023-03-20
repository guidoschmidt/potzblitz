import "../scss/Button.scss";
import { mergeProps } from "solid-js";
import { ButtonProps, camelCaseWithSpaces } from "../api";

export function Button(props: ButtonProps) {
  const mprops: ButtonProps = mergeProps(
    { label: "", onClick: () => {}, classList: {} },
    props
  );

  return (
    <div class="button-wrapper" classList={mprops.classList}>
      <button
        class="button"
        onClick={props?.onClick}
        disabled={mprops.disabled}
      >
        {camelCaseWithSpaces(mprops.label)}
      </button>
    </div>
  );
}

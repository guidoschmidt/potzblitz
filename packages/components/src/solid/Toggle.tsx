import "../scss/Toggle.scss";
import { camelCaseWithSpaces, ToggleProps } from "../api";
import { createSignal, mergeProps } from "solid-js";

export function Toggle(props: ToggleProps) {
  const mprops: ToggleProps = mergeProps(
    { value: false, onChange: () => {} },
    props
  );

  const [vO, setVO] = createSignal(props.value);

  const handleSwitch = () => {
    const newValue = !vO();
    setVO(newValue);
    mprops.onChange && mprops.onChange(newValue);
  };

  return (
    <div class="toggle">
      {mprops.label && <label>{camelCaseWithSpaces(mprops.label)}</label>}
      <div class="knob" onClick={handleSwitch}>
        <div classList={{ state: true, on: vO() }}>
          <input type="checkbox" value={vO()} />
        </div>
      </div>
    </div>
  );
}

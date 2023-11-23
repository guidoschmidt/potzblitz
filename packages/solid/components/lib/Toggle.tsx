import "@potzblitz/styles/lib/components/Toggle.scss";
import { camelCaseWithSpaces, ToggleProps } from "@potzblitz/api";
import { createSignal, mergeProps, createEffect } from "solid-js";

interface solidToggleProps extends ToggleProps {
  value: boolean;
}

export function Toggle(props: solidToggleProps) {
  const mprops: solidToggleProps = mergeProps(
    { value: false, onChange: () => {} },
    props,
  );

  const [vO, setVO] = createSignal(props.value);

  createEffect(() => {
    setVO(mprops.value);
  });

  const handleSwitch = () => {
    const newValue = !vO();
    setVO(newValue);
    mprops.onChange && mprops.onChange(newValue);
  };

  return (
    <div class="toggle">
      {mprops.label && <label>{camelCaseWithSpaces(mprops.label)}</label>}
      <div class="input-wrapper" onClick={handleSwitch}>
        <div classList={{ state: true, on: vO(), off: !vO() }}>
          <input type="checkbox" value={vO().toString()} checked={vO()} />
        </div>
      </div>
    </div>
  );
}

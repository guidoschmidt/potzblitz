import "../scss/Select.scss";
import { SelectProps } from "../api";
import { For, mergeProps, createSignal } from "solid-js";
import { CopyValueButton } from "./blocks";

export function Select<T>(props: SelectProps<T>) {
  const mprops: SelectProps<T> = mergeProps(
    { options: [], value: undefined },
    props
  );

  const [vO, setVO] = createSignal(mprops.value);
  const [showOptionsO, setShowOptionsO] = createSignal(false);

  const handleSelect = (e: PointerEvent) => {
    // const target = e.target as HTMLDivElement;
    // const selectedValue = target.innerText;
    // setVO(selectedValue);
    // setShowOptionsO(false);
    // ctx[name] = selectedValue;
    // onselect && onselect(selectedValue);
  };

  return (
    <div class="select">
      {props.label && <label for="">{mprops.label}</label>}
      <div class="selected" onClick={() => setShowOptionsO(!showOptionsO())}>
        {vO()}
      </div>
      <div classList={{ options: true, hidden: !showOptionsO() }}>
        <For each={mprops.options}>
          {(option: T, _i: () => number) => {
            return <div class="option">{option}</div>;
          }}
        </For>
      </div>
      <CopyValueButton value={vO()} />
    </div>
  );
}

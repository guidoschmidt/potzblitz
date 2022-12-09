import "../scss/Select.scss";
import { SelectProps } from "../api";
import { For, mergeProps, createSignal } from "solid-js";
import { CopyValueButton } from "./blocks";

export function Select<T>(props: SelectProps<T>) {
  const mprops: SelectProps<T> = mergeProps({ options: [], value: 0 }, props);

  const [vO, setVO] = createSignal<number>(mprops.value);
  const [showOptionsO, setShowOptionsO] = createSignal(false);

  const handleSelect = (idx: number) => {
    props.onSelect && props.onSelect(idx);
    setVO(idx);
    setShowOptionsO(false);
  };

  return (
    <div class="select">
      {props.label && <label for="">{mprops.label}</label>}
      <div class="selected" onClick={() => setShowOptionsO(!showOptionsO())}>
        {mprops.options[vO()]}
      </div>
      <div classList={{ options: true, hidden: !showOptionsO() }}>
        <For each={mprops.options}>
          {(option: T, i: () => number) => {
            if (i() === vO()) return <></>;
            return (
              <div class="option" onclick={() => handleSelect(i())}>
                {option}
              </div>
            );
          }}
        </For>
      </div>
      <CopyValueButton value={vO()} />
    </div>
  );
}

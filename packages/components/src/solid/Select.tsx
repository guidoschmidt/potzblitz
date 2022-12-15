import "../scss/Select.scss";
import { SelectProps, uniqueName } from "../api";
import { For, mergeProps, createSignal } from "solid-js";
import { CopyValueButton } from "./blocks";

export function Select<T>(props: SelectProps<T>) {
  const mprops: SelectProps<T> = mergeProps({ options: [], value: 0 }, props);
  const [idStr, _id] = uniqueName(mprops.label);
  const [vO, setVO] = createSignal<number>(mprops.value);
  const [showOptions, setShowOptions] = createSignal(false);

  const handleSelect = (option: T) => {
    const idx = mprops.options.indexOf(option);
    props.onSelect && props.onSelect(idx);
    setVO(idx);
    setShowOptions(false);
  };

  return (
    <div class="select" id={idStr}>
      {props.label && <label for={idStr}>{mprops.label}</label>}
      <div class="selected" onClick={() => setShowOptions(!showOptions())}>
        {mprops.options[vO()]}
      </div>
      <div classList={{ options: true, hidden: !showOptions() }}>
        <For
          each={mprops.options.filter((o) => o !== mprops.options[vO()])}
          fallback={<></>}
        >
          {(option: T, _: () => number) => {
            return (
              <div
                classList={{ option: true }}
                onclick={() => handleSelect(option)}
              >
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

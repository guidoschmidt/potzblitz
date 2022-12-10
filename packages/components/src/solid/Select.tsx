import "../scss/Select.scss";
import { SelectProps } from "../api";
import { For, mergeProps, createSignal } from "solid-js";
import { CopyValueButton } from "./blocks";

export function Select<T>(props: SelectProps<T>) {
  const mprops: SelectProps<T> = mergeProps({ options: [], value: 0 }, props);

  const [vO, setVO] = createSignal<number>(mprops.value);
  const [showOptionsO, setShowOptionsO] = createSignal(false);

  const handleSelect = (option: T) => {
    const idx = mprops.options.indexOf(option);
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
        <For each={mprops.options} fallback={<></>}>
          {(option: T, _: () => number) => {
            return (
              <div
                classList={{
                  option: true,
                  hidden: option === mprops.options[vO()],
                }}
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

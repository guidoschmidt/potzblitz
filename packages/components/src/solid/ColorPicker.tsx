import "../scss/ColorPicker.scss";
import { mergeProps, createSignal, createEffect } from "solid-js";
import { uniqueName } from "../api/utils";
import { ColorPickerProps } from "../api/types";
import { CopyValueButton } from "./blocks";

export function ColorPicker(props: ColorPickerProps) {
  const mprops = mergeProps<ColorPickerProps>(
    { value: "#fff", onSelect: () => {} },
    props
  );
  const [idStr, _id] = uniqueName(props.label);
  const [vO, setVO] = createSignal<string>(mprops.value);

  createEffect(() => {
    setVO(mprops.value);
  });

  const handleColorChange = (e: InputEvent) => {
    const target = e.target as HTMLInputElement;
    setVO(target.value);
    props.onSelect && props.onSelect(target.value);
  };

  return [
    <div class="color-picker">
      {mprops.label && <label>{mprops.label}</label>}
      <input id={idStr} type="color" value={vO()} onInput={handleColorChange} />
      <label class="color-preview-wrapper" htmlFor={idStr}>
        <div
          class="color-preview"
          style={{ "background-color": vO(), color: vO() }}
        />
      </label>
      <CopyValueButton value={vO()} />
    </div>,
  ];
}

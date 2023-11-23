import "@potzblitz/styles/lib/components/ColorPicker.scss";
import { ColorPickerProps, uniqueName } from "@potzblitz/api";
import { mergeProps, createSignal, createEffect } from "solid-js";
import { CopyValueButton, ValueView } from "./blocks";

interface solidColorPickerProps extends ColorPickerProps {
  value: string;
}

export function ColorPicker(props: solidColorPickerProps) {
  const mprops = mergeProps({ value: "#888", onSelect: () => {} }, props);
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

  return (
    <div class="colorpicker">
      {mprops.label && <label for={idStr}>{mprops.label}</label>}
      <input id={idStr} type="color" value={vO()} onInput={handleColorChange} />
      <label class="color-preview-wrapper" htmlFor={idStr}>
        <div
          class="color-preview"
          style={{ "background-color": vO(), color: vO() }}
        />
      </label>
      {false && <CopyValueButton value={vO()} />}
      <ValueView value={vO()} />
    </div>
  );
}

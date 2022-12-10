import "../scss/ColorPicker.scss";
import h from "hyperscript";
import { camelCaseWithSpaces, ColorPickerProps, uniqueName } from "../api";
import { CopyValueButton, AdditionalValueInput } from "./blocks";
import { createSignal } from "./reactive";

export function ColorPicker(props: ColorPickerProps, ctx?: object) {
  const [idStr, _id] = uniqueName(props.label);
  const [vO, setVO] = createSignal(props.value);

  vO((v: string) => {
    // if (prop.includes("/")) {
    //   const [arrayName, propertyNameIndex] = name.split("/");
    //   const propertyIdx = parseInt(propertyNameIndex.match(/\d+/g).toString());
    //   const propertyName = propertyNameIndex.match(/[a-zA-Z]+/g).toString();
    //   onupdate &&
    //     onupdate({
    //       type: "array",
    //       arrayName,
    //       arrayIdx: propertyIdx,
    //       propertyName,
    //       v,
    //     });
    // } else {
    if (ctx) ctx[props.label] = v;
    props.onSelect && props.onSelect(v);
  });

  const oninput = (e: InputEvent) => {
    const target = e.target as HTMLInputElement;
    setVO(target.value);
    const preview = target.parentNode.querySelector(
      ".color-preview"
    ) as HTMLDivElement;
    preview.style.backgroundColor = vO() as string;
  };

  return h("div.colorpicker", [
    props.label && h("label", camelCaseWithSpaces(props.label)),
    h(`input#${idStr}.input`, {
      type: "color",
      value: props.value,
      oninput,
    }),
    h(
      "label.color-preview-wrapper",
      { htmlFor: `${idStr}` },
      h("div.color-preview", {
        style: {
          "background-color": props?.value || "#ff0000",
          color: vO,
        },
      })
    ),
    AdditionalValueInput({ value: vO }),
    CopyValueButton({ value: vO }),
  ]);
}

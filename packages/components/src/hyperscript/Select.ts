import "../scss/Select.scss";
import h from "hyperscript";
import { camelCaseWithSpaces, SelectProps, uniqueName } from "../api";
import { createSignal } from "./reactive";
import { CopyValueButton } from "./blocks";

export function Select<T>(props: SelectProps<T>, ctx?: object): HTMLElement {
  const [idStr, _id] = uniqueName(props.label);

  const [vO, setVO] = createSignal(props.value);
  const [showOptionsO, setShowOptionsO] = createSignal(false);

  const handleSelect = (e: PointerEvent) => {
    const target = e.target as HTMLDivElement;
    const selectedValue = target.innerText;
    setVO(selectedValue);
    setShowOptionsO(false);
    if (ctx) ctx[props.label] = selectedValue;
    props.onSelect && props.onSelect(selectedValue);
  };

  showOptionsO((show: boolean) => {
    const options = document.querySelector(`#options-${idStr}`);
    console.log(options);
    show
      ? options?.classList.remove("hidden")
      : options?.classList.add("hidden");
  });

  return h("div.select", [
    h("label", camelCaseWithSpaces(props.label)),
    h("div.selected", { onclick: () => setShowOptionsO(!showOptionsO()) }, vO),
    h(
      `div.options#options-${idStr}.hidden`,
      props.options.map((o) =>
        h(
          "div.option",
          {
            onclick: handleSelect,
          },
          o
        )
      )
    ),
    CopyValueButton({ value: vO }),
  ]);
}

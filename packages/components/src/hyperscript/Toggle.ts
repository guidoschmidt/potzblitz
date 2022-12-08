import "../scss/Toggle.scss";
import h from "hyperscript";
import { camelCaseWithSpaces, uniqueName, ToggleProps } from "../api";
import { CopyValueButton } from "./blocks";
import { createSignal } from "./reactive";

export function Toggle({ label, value, ctx, onChange }: ToggleProps) {
  const [idStr, _id] = uniqueName(label);
  const [vO, setVO] = createSignal(value);

  vO((v) => {
    if (ctx) ctx[label] = v;
    const stateDiv = document.querySelector(`#${idStr}`) as HTMLDivElement;
    if (stateDiv) {
      stateDiv.classList.toggle("on");
    }
    onChange && onChange(v);
  });

  const onclick = (_: InputEvent) => {
    setVO(!vO());
  };

  return h("div.toggle", [
    h("label", { htmlFor: label }, camelCaseWithSpaces(label)),
    h(
      "div.knob",
      { onclick },
      h(
        `div.state#${idStr}.${value ? "on" : "off"}`,
        h(`input#${label}`, { type: "checkbox", value })
      )
    ),
  ]);
}

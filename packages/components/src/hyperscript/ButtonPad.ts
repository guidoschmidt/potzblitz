import "../scss/ButtonPad.scss";
import h from "hyperscript";
import { createSignal } from "./reactive";
import { camelCaseWithSpaces, ButtonPadProps } from "../api";

export function ButtonPad(
  { label, onClick, value, layout, onUpdate }: ButtonPadProps,
  ctx?: { [key: string]: number }
): HTMLElement {
  const [vO, setVO] = createSignal(value);

  vO((v: number) => {
    if (ctx) ctx[label] = v;
    onUpdate && onUpdate(v);
  });

  const handleClick = (i: number) => {
    document.querySelector(`.button-${vO()}`)?.classList.toggle("active");
    document.querySelector(`.button-${i}`)?.classList.toggle("active");
    setVO(i);
    onClick && onClick(i);
  };

  const list: number[] = new Array(layout[0] * layout[1]);
  const style = {
    "grid-template-columns": `repeat(${layout[0]}, var(--buttonpad--button-size))`,
    "grid-template-rows": `repeat(${layout[1]}, var(--buttonpad--button-size))`,
  };
  return h("div.buttonpad", [
    h("label", camelCaseWithSpaces(label as string)),
    h(
      "div.pad",
      { style },
      list.fill(0).map((_, i) => {
        if (i === vO()) {
          return h(
            `button.button.button-${i}.active`,
            { onclick: () => handleClick(i) },
            ""
          );
        }
        return h(
          `button.button.button-${i}`,
          { onclick: () => handleClick(i) },
          ""
        );
      })
    ),
  ]);
}

// { onclick: onClick && onClick.bind(ctx) }

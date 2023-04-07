import "@potzblitz/components/src/scss/Select.scss";
import { $list } from "@thi.ng/rdom";
import { reactive } from "@thi.ng/rstream";
import type { Stream } from "@thi.ng/rstream";

export interface SelectProps {
  label: string;
  value: Stream<number>;
  options: string[];
}

export function Select(props: any) {
  return [
    "div.select",
    {},
    ["label", {}, props.label],
    [
      "div.selected",
      {
        onclick: (e: PointerEvent) => {
          const target = e.currentTarget as HTMLDivElement;
          const optionsEl = target.parentNode?.querySelector(".options");
          if (optionsEl) {
            optionsEl.classList.remove("hidden");
          }
        },
      },
      props.value,
    ],
    $list(reactive(props.options), "div", { class: "options hidden" }, (o) => [
      "div.option",
      {
        onclick: (e: PointerEvent) => {
          const target = e.target as HTMLDivElement;
          const optionsEl = target.parentNode as HTMLDivElement;
          optionsEl.classList.add("hidden");
          props.onSelect(o);
        },
      },
      o,
    ]),
  ];
}

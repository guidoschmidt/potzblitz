import "@potzblitz/components/src/scss/Toggle.scss";
import { reactive } from "@thi.ng/rstream";
import type { Stream } from "@thi.ng/rstream";

export interface ToggleProps {
  label: string;
  value: Stream<boolean>;
  onClick: (v: boolean) => any;
}

export function Toggle(props: ToggleProps) {
  const toggle = reactive<boolean>(props.value.deref() ?? false);

  return [
    "div.toggle",
    {},
    props.label && ["label", {}, props.label],
    [
      "div.input-wrapper",
      {
        onclick: (e: PointerEvent) => {
          const target = e.target as HTMLDivElement;
          target.querySelector(".state")?.classList.toggle("on");
          target.querySelector(".state")?.classList.toggle("off");
          toggle.next(!toggle.deref());
          props.onClick(toggle.deref() ?? false);
        },
      },
      [
        `div.state.${props.value ? "on" : "off"}`,
        {
          id: props.label,
        },
        [`input`, { type: "checkbox", value: props.value }],
      ],
    ],
  ];
}

import "@potzblitz/components/src/scss/ColorSelector.scss";
import { $style } from "@thi.ng/rdom";
import { css, hsv, rgb } from "@thi.ng/color";
import { reactive } from "@thi.ng/rstream";
import { uuid } from "@thi.ng/random";
import type { Stream } from "@thi.ng/rstream";

export interface ColorSelectorProps {
  label?: string;
  value: Stream<string>;
  onSelect: (c: string) => any;
}

export function ColorSelector(props: ColorSelectorProps) {
  const colorValues = reactive<number[]>([50, 50, 50]);
  const dragValues = reactive([false, false, false, false]);
  const id = uuid();

  const toggleTool = (div: HTMLDivElement) => {
    const tool = div.parentNode?.querySelector(".tool");
    tool?.classList.toggle("hidden");
  };

  const triggerSelect = () => {
    const colorVal = css(rgb(hsv(colorValues.deref())));
    props.onSelect && props.onSelect(colorVal);
  };

  const updateKnob = (target: HTMLDivElement, v: number) => {
    const knob = target.querySelector(".knob");
    if (knob) {
      $style(knob, {
        left: `${v * 100}%`,
      });
    }
  };

  const updateCssColorVar = (target: HTMLElement) => {
    const el = target.closest(".colorselector");
    if (el) {
      el.style.setProperty(
        "--hue-current",
        `${Math.round(colorValues.deref()[0] * 360)} `
      );
    }
  };

  return [
    "div.colorselector",
    { id },
    ["label", {}, props.label],
    [
      "div.color-preview-wrapper",
      {
        onclick: (e: PointerEvent) => {
          toggleTool(e.target as HTMLDivElement);
        },
      },
      [
        "div.color-preview",
        {
          style: { background: props.value },
        },
      ],
      [
        "div.tool.hidden",
        {},
        [
          "div.preview",
          {
            style: { background: props.value },
          },
          [
            "button.button",
            {
              onclick: (e: PointerEvent) => {
                const tool = e.target?.parentNode?.parentNode;
                tool?.classList.add("hidden");
              },
            },
            "×",
          ],
        ],
        [
          "div.panel",
          {
            onpointerdown: () => {
              dragValues.next([true, false, false, false]);
            },
            onpointerup: () => {
              dragValues.next([false, false, false, false]);
              triggerSelect();
            },
            onpointerleave: () => {
              dragValues.next([false, false, false, false]);
            },
            onpointermove: (e: PointerEvent) => {
              if (!dragValues.deref()[0]) return;
              const target = e.target as HTMLDivElement;
              const { clientX, clientY } = e;
              const { left, top, width, height } =
                target.getBoundingClientRect();
              const sat = (clientX - left) / width;
              const val = 1.0 - (clientY - top) / height;
              colorValues.next([colorValues.deref()[0], sat, val]);
              const selectionEl = target.parentNode.querySelector(".selection");
              $style(selectionEl, {
                left: `${sat * 100}%`,
                top: `${100 - val * 100}%`,
              });
              triggerSelect();
            },
          },
          ["div.color", {}],
          ["div.selection", {}],
        ],
        [
          "div.control.hue",
          {
            onpointerdown: (e: PointerEvent) => {
              dragValues.next([false, true, false, false]);
              const target = e.target as HTMLDivElement;
              const { clientX } = e;
              const { left, width } = target.getBoundingClientRect();
              const hue = (clientX - left) / width;
              colorValues.next([hue, ...colorValues.deref().slice(1, 3)]);
              updateKnob(target, hue);
            },
            onpointerup: () => dragValues.next([false, false, false, false]),
            onpointerleave: () => dragValues.next([false, false, false, false]),
            onpointermove: (e: PointerEvent) => {
              if (!dragValues.deref()[1]) return;
              const target = e.target as HTMLDivElement;
              const { clientX } = e;
              const { left, width } = target.getBoundingClientRect();
              const hue = (clientX - left) / width;
              colorValues.next([hue, ...colorValues.deref().slice(1, 3)]);
              updateKnob(target, hue);
              updateCssColorVar(target);
              triggerSelect();
            },
          },
          [
            "div.knob",
            {
              style: {
                background: `hsl(0, 0%, ${
                  100 - colorValues.deref()[2] * 100
                }%)`,
              },
            },
          ],
        ],
        [
          "div.control.sat",
          {
            onpointerdown: (e: PointerEvent) => {
              dragValues.next([false, false, true, false]);
              const target = e.target as HTMLDivElement;
              const { clientX } = e;
              const { left, width } = target.getBoundingClientRect();
              const sat = (clientX - left) / width;
              const update = colorValues.deref();
              update[1] = sat;
              colorValues.next(update);
              updateKnob(target, sat);
              triggerSelect();
            },
            onpointerup: () => dragValues.next([false, false, false, false]),
            onpointerleave: () => dragValues.next([false, false, false, false]),
            onpointermove: (e: PointerEvent) => {
              if (!dragValues.deref()[2]) return;
              const target = e.target as HTMLDivElement;
              const { clientX } = e;
              const { left, width } = target.getBoundingClientRect();
              const sat = (clientX - left) / width;
              const update = colorValues.deref();
              update[1] = sat;
              colorValues.next(update);
              updateKnob(target, sat);
              updateCssColorVar(target);
              triggerSelect();
            },
          },
          ["div.knob", {}],
        ],
        [
          "div.control.val",
          {
            onpointerdown: (e: PointerEvent) => {
              dragValues.next([false, false, false, true]);
              const target = e.target as HTMLDivElement;
              const { clientX } = e;
              const { left, width } = target.getBoundingClientRect();
              const val = (clientX - left) / width;
              const update = colorValues.deref();
              update[2] = val;
              colorValues.next(update);
              updateKnob(target, val);
              triggerSelect();
            },
            onpointerup: () => dragValues.next([false, false, false, false]),
            onpointerleave: () => dragValues.next([false, false, false, false]),
            onpointermove: (e: PointerEvent) => {
              if (!dragValues.deref()[3]) return;
              const target = e.target as HTMLDivElement;
              const { clientX } = e;
              const { left, width } = target.getBoundingClientRect();
              const val = (clientX - left) / width;
              const update = colorValues.deref();
              update[2] = val;
              colorValues.next(update);
              updateKnob(target, val);
              updateCssColorVar(target);
              triggerSelect();
            },
          },
          ["div.knob", {}],
        ],
      ],
    ],
  ];
}

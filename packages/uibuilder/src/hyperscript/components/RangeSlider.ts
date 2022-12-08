import h from "hyperscript";
import { camelCaseWithSpaces, uuid, remap } from "../../utils";
import { createSignal } from "../../o";
import { Container } from "./";
import "scss.ui.toolkit/6-components/_range.scss";

type RangeValue = {
  low: number;
  high: number;
};

export function RangeSlider({
  name,
  value,
  ctx,
  onupdate,
  min,
  max,
  step,
}: {
  name: string;
  value: RangeValue;
  ctx: object;
  min: number;
  max: number;
  step: number;
  onupdate: (ctx: object) => any;
}) {
  const stepMult = 1.0 / step;
  const id = uuid();
  let selected = undefined;
  const [vLowO, setVLowO] = createSignal(value.low);
  const [vHighO, setVHighO] = createSignal(value.high);

  vHighO((v: number) => {
    ctx[name].high = v;
    onupdate && onupdate(ctx);
  });

  vLowO((v: number) => {
    ctx[name].low = v;
    onupdate && onupdate(ctx);
  });

  let rangeRef: HTMLDivElement;

  const ondrag = (e: PointerEvent) => {
    if (rangeRef === null || rangeRef === undefined) {
      rangeRef = document.querySelector(`#${name}-${id}`);
    }
    const { left, width } = rangeRef.getBoundingClientRect();
    const newXPercent = ((e.clientX - left) / width) * 100.0;
    if (newXPercent < 0 || newXPercent > 100) return;
    const newXRange = remap(newXPercent, 0, 100, min, max);
    const knob = rangeRef.querySelector(`.${selected}`) as HTMLDivElement;
    if (knob !== null) {
      if (selected === "low" && newXRange < vHighO()) {
        knob.style.left = `${newXPercent}%`;
        knob.classList.toggle("active");
        const preciseVal = Math.round(newXRange * stepMult) / stepMult;
        setVLowO(Math.min(preciseVal, vHighO()));
      }
      if (selected === "high" && newXRange > vLowO()) {
        knob.style.left = `${newXPercent}%`;
        knob.classList.toggle("active");
        const preciseVal = Math.round(newXRange * stepMult) / stepMult;
        setVHighO(Math.max(vLowO(), preciseVal));
      }
    }
  };

  window.addEventListener("pointerdown", (e) => {
    if (
      (e.target as HTMLDivElement).id === `#${name}-${id}` ||
      (e.target as HTMLDivElement).classList.contains("knob")
    ) {
      if (e.stopPropagation) e.stopPropagation();
      if (e.preventDefault) e.preventDefault();
      e.cancelBubble = true;
      e.returnValue = false;
      return false;
    }
  });

  window.addEventListener(
    "pointermove",
    (e) => {
      if (selected) {
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        e.cancelBubble = true;
        e.returnValue = false;
        if (selected !== undefined) {
          ondrag(e);
        }
        return false;
      }
    },
    true
  );

  window.addEventListener("pointerup", (_e) => {
    if (selected) {
      selected = undefined;
    }
  });

  return Container(".range", [
    h("label", camelCaseWithSpaces(name.split("/").pop())),
    h(
      `div.range-slider#${name}-${id}`,
      {
        onpointerdown: (e: PointerEvent) => false,
        onselectstart: () => false,
        onpointerup: () => (selected = undefined),
        onpointerleave: (e: PointerEvent) => {
          e.preventDefault();
          e.stopPropagation();
        },
      },
      h("div.track", {}, [
        h(`div.knob.low`, {
          style: { left: `${remap(vLowO(), min, max, 0, 100)}%` },
          onpointerdown: () => (selected = "low"),
          onpointerup: () => (selected = undefined),
          draggable: false,
        }),
        h("div.knob.high", {
          style: { left: `${remap(vHighO(), min, max, 0, 100)}%` },
          onpointerdown: () => (selected = "high"),
          onpointerup: () => (selected = undefined),
          draggable: false,
        }),
      ])
    ),
    h("span.text-value", [h("span.high", vHighO), h("span.low", vLowO)]),
  ]);
}

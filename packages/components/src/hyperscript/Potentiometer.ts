import "../scss/Potentiometer.scss";
import h from "hyperscript";
import { camelCaseWithSpaces, PotentiometerProps, uniqueName } from "../api";
import { CopyValueButton, AdditionalValueInput } from "./blocks";
import { createSignal } from "./reactive";

export function Potentiometer(props: PotentiometerProps, ctx: object) {
  const [idStr, _id] = uniqueName(props.label);

  const [vO, setVO] = createSignal(props.value);
  const [isDragging, setIsDragging] = createSignal(false);

  vO((v: number) => {
    if (ctx) ctx[props.label] = v;
    const target = document.querySelector(`#${idStr}`) as HTMLDivElement;
    if (target === undefined || target === null) return;
    const knob = target.querySelector(".knob") as HTMLDivElement;
    if (knob) {
      knob.style.transform = `rotate(${v * 3.6}deg)`;
    }
    props.onUpdate && props.onUpdate(v);
  });

  const onpointermove = (e: MouseEvent) => {
    if (!isDragging()) return;
    const knobWrapper = document.querySelector(`#${idStr}`);
    const { width, height, x, y } = knobWrapper.getBoundingClientRect();
    const xRel = width * 0.5 - (e.clientX - x);
    const yRel = height * 0.5 - (e.clientY - y);
    const vec = [-xRel, yRel];
    const length = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1]);
    if (length < 5.0) return;
    const angle = Math.round(
      ((Math.atan2(vec[0], vec[1]) + Math.PI) * (180 / Math.PI)) / 3.6
    );
    setVO(angle);
  };

  window.addEventListener("pointerdown", (e) => {
    const target = e.target as HTMLDivElement;
    if (
      target.classList.contains("angle-indicator") ||
      target.classList.contains("knob-wrapper")
    ) {
      setIsDragging(true);
      if (e.stopPropagation) e.stopPropagation();
      if (e.preventDefault) e.preventDefault();
      e.cancelBubble = true;
      e.returnValue = false;
      return false;
    }
  });

  window.addEventListener("pointermove", (e) => {
    if (isDragging()) {
      if (e.stopPropagation) e.stopPropagation();
      if (e.preventDefault) e.preventDefault();
      e.cancelBubble = true;
      e.returnValue = false;
      onpointermove(e);
      return false;
    }
  });

  window.addEventListener("pointerup", () => {
    setIsDragging(false);
  });

  const onpointerdown = () => setIsDragging(true);
  const onpointerup = () => setIsDragging(false);

  return h("div.potentiometer", [
    h("label", camelCaseWithSpaces(props.label)),
    h(
      `div.knob-wrapper#${idStr}`,
      { onpointermove, onpointerdown, onpointerup },
      h(
        `div.knob`,
        {
          style: {
            transform: `rotate(${(props.value % 100) * 3.6}deg)`,
          },
        },
        [h("div.angle-indicator")]
      )
    ),
    AdditionalValueInput({ value: vO }),
    CopyValueButton({ value: vO }),
  ]);
}

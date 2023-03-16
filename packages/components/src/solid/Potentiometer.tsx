import "../scss/Potentiometer.scss";
import {
  mergeProps,
  createSignal,
  onMount,
  onCleanup,
  createEffect,
} from "solid-js";
import { PotentiometerProps, uniqueName } from "../api";
import { CopyValueButton, ValueView } from "./blocks";

export function Potentiometer(props: PotentiometerProps) {
  let knobWrapperRef: HTMLDivElement;
  const mprops: PotentiometerProps = mergeProps(
    { value: 0.0, min: 0.0, max: 100.0, step: 1.0, onUpdate: () => {} },
    props
  );

  const [idStr, _id] = uniqueName(mprops.label);
  const [vO, setVO] = createSignal(mprops.value % 100.0);
  const [isDragging, setIsDragging] = createSignal(false);

  createEffect(() => {
    setVO(mprops.value % 100.0);
  });

  const onPointerMove = (e: PointerEvent) => {
    if (!isDragging()) return;
    const knobWrapper = knobWrapperRef;
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
    mprops.onUpdate && mprops.onUpdate(angle);
  };

  const onPointerDown = () => setIsDragging(true);

  const onPointerUp = () => setIsDragging(false);

  const windowPointerDown = (e: PointerEvent) => {
    const target = e.target as HTMLDivElement;
    if (
      target.classList.contains("angle-indicator") ||
      target.classList.contains("knob-wrapper")
    ) {
      setIsDragging(true);
      if (e.stopPropagation) e.stopPropagation();
      if (e.preventDefault) e.preventDefault();
      e.cancelBubble = true;
      return false;
    }
  };

  const windowPointerMove = (e: PointerEvent) => {
    if (isDragging()) {
      if (e.stopPropagation) e.stopPropagation();
      if (e.preventDefault) e.preventDefault();
      e.cancelBubble = true;
      onPointerMove(e);
      return false;
    }
  };

  onMount(() => {
    window.addEventListener("pointerdown", windowPointerDown);
    window.addEventListener("pointermove", windowPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  });

  onCleanup(() => {
    window.removeEventListener("pointerdown", windowPointerDown);
    window.removeEventListener("pointermove", windowPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  });

  return (
    <div class="potentiometer" id={idStr}>
      {mprops.label && <label for={idStr}>{mprops.label}</label>}
      <div
        class="knob-wrapper"
        ref={knobWrapperRef}
        onPointerMove={onPointerMove}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div class="knob" style={{ transform: `rotate(${vO() * 3.6}deg)` }}>
          <div class="angle-indicator" />
        </div>
      </div>
      <ValueView value={vO()} />
      <CopyValueButton value={vO()} />
    </div>
  );
}

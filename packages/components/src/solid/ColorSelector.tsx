import "../scss/ColorSelector.scss";
import { mergeProps, createSignal, createEffect } from "solid-js";
import { ColorSelectorProps, uniqueName } from "../api";
import { ValueView } from "./blocks";

interface solidColorSelectorProps extends ColorSelectorProps {
  value: string;
}

export function ColorSelector(props: solidColorSelectorProps) {
  const mprops = mergeProps({ value: "#888", onSelect: () => {} }, props);
  const [idStr, _id] = uniqueName(props.label);
  const [activeTool, setActiveTool] = createSignal<boolean>(false);
  const [dragValues, setDragValues] = createSignal<
    [boolean, boolean, boolean, boolean]
  >([false, false, false, false]);
  const [colorValues, setColorValues] = createSignal<[number, number, number]>([
    0, 0, 0,
  ]);

  let ref: HTMLDivElement;
  let toolRef: HTMLDivElement;

  const hsv2hslStr = (): string => {
    // both hsv and hsl values are in [0, 1]
    const [h, s, v] = colorValues();
    let sR = s / 100;
    let sO = 0;
    let vR = 1 - v / 100;
    let l = ((2 - sR) * vR) / 2;
    if (l != 0) {
      if (l == 1) {
        sO = 0;
      } else if (l < 0.5) {
        sO = (sR * vR) / (l * 2);
      } else {
        sO = (sR * vR) / (2 - l * 2);
      }
    }
    return `hsl(${h * 3.6}, ${sO * 100}%, ${l * 100}%)`;
  };

  createEffect(() => {
    ref?.style.setProperty(
      "--hue-current",
      `${Math.round(colorValues()[0] * 3.6)} `
    );
  });

  const onClickOutside = (e: PointerEvent) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    if (!toolRef.contains(target) && !target.classList.contains("tool")) {
      hideTool();
    }
  };

  const hideTool = () => {
    setActiveTool(false);
    setDragValues([false, false, false, false]);
    window.removeEventListener("pointerdown", onClickOutside, true);
  };

  const showTool = (e: PointerEvent) => {
    e.preventDefault();
    setActiveTool(true);
    window.addEventListener("pointerdown", onClickOutside, true);
  };

  return (
    <div class="colorselector" ref={ref}>
      {mprops.label && <label for={idStr}>{mprops.label}</label>}
      <div
        class="color-preview-wrapper"
        style={{ "z-index": activeTool() ? "999" : "0" }}
      >
        <div
          class="color-preview"
          onClick={(e: PointerEvent) => showTool(e)}
          style={{
            background: hsv2hslStr(),
          }}
        />
        {activeTool() && (
          <div class="tool" ref={toolRef}>
            <div
              class="preview"
              onClick={() => hideTool()}
              style={{
                background: hsv2hslStr(),
              }}
            />
            <div
              class="panel"
              onPointerDown={(e: PointerEvent) => {
                setDragValues([true, false, false, false]);
                const target = e.target as HTMLDivElement;
                const { clientX, clientY } = e;
                const { left, top, width, height } =
                  target.getBoundingClientRect();
                setColorValues([
                  colorValues()[0],
                  Math.round(((clientX - left) / width) * 100),
                  Math.round(((clientY - top) / height) * 100),
                ]);
              }}
              onPointerUp={(e) => {
                setDragValues([false, false, false, false]);
              }}
              onPointerLeave={(e) => {
                setDragValues([false, false, false, false]);
              }}
              onPointerMove={(e: PointerEvent) => {
                if (!dragValues()[0]) return;
                const target = e.target as HTMLDivElement;
                const { clientX, clientY } = e;
                const { left, top, width, height } =
                  target.getBoundingClientRect();
                setColorValues([
                  colorValues()[0],
                  Math.round(((clientX - left) / width) * 100),
                  Math.round(((clientY - top) / height) * 100),
                ]);
              }}
            >
              <div class="color" />
              <div
                class="selection"
                style={{
                  left: `${colorValues()[1]}%`,
                  top: `${colorValues()[2]}%`,
                  "border-color": `hsl(0, 0%, ${colorValues()[2]}%)`,
                }}
              />
            </div>
            <div
              class="control hue"
              onPointerDown={(e: PointerEvent) => {
                setDragValues([false, true, false, false]);
                const target = e.target as HTMLDivElement;
                const { clientX } = e;
                const { left, width } = target.getBoundingClientRect();
                setColorValues([
                  Math.round(((clientX - left) / width) * 100),
                  colorValues()[1],
                  colorValues()[2],
                ]);
              }}
              onPointerUp={() => setDragValues([false, false, false, false])}
              onPointerLeave={() => setDragValues([false, false, false, false])}
              onPointerMove={(e: PointerEvent) => {
                if (!dragValues()[1]) return;
                const target = e.target as HTMLDivElement;
                const { clientX } = e;
                const { left, width } = target.getBoundingClientRect();
                setColorValues([
                  Math.round(((clientX - left) / width) * 100),
                  colorValues()[1],
                  colorValues()[2],
                ]);
              }}
            >
              <div
                class="knob"
                style={{
                  left: `${colorValues()[0]}%`,
                  background: `hsl(${colorValues()[0] * 3.6}, 100%, 50%)`,
                }}
              />
            </div>
            <div
              class="control sat"
              onPointerDown={(e) => {
                setDragValues([false, false, true, true]);
                const target = e.target as HTMLDivElement;
                const { clientX } = e;
                const { left, width } = target.getBoundingClientRect();
                setColorValues([
                  colorValues()[0],
                  Math.round(((clientX - left) / width) * 100),
                  colorValues()[2],
                ]);
              }}
              onPointerUp={() => setDragValues([false, false, false, false])}
              onPointerLeave={() => setDragValues([false, false, false, false])}
              onPointerMove={(e: PointerEvent) => {
                if (!dragValues()[2]) return;
                const target = e.target as HTMLDivElement;
                const { clientX } = e;
                const { left, width } = target.getBoundingClientRect();
                setColorValues([
                  colorValues()[0],
                  Math.round(((clientX - left) / width) * 100),
                  colorValues()[2],
                ]);
              }}
            >
              <div
                class="knob"
                style={{
                  left: `${colorValues()[1]}%`,
                  background: `hsl(${colorValues()[0] * 3.6}, ${
                    colorValues()[1]
                  }%, 50%)`,
                }}
              />
            </div>
            <div
              class="control val"
              onPointerDown={(e) => {
                setDragValues([false, false, false, true]);
                const target = e.target as HTMLDivElement;
                const { clientX } = e;
                const { left, width } = target.getBoundingClientRect();
                setColorValues([
                  colorValues()[0],
                  colorValues()[1],
                  Math.round(((clientX - left) / width) * 100),
                ]);
              }}
              onPointerUp={() => setDragValues([false, false, false, false])}
              onPointerLeave={() => setDragValues([false, false, false, false])}
              onPointerMove={(e: PointerEvent) => {
                if (!dragValues()[3]) return;
                const target = e.target as HTMLDivElement;
                const { clientX } = e;
                const { left, width } = target.getBoundingClientRect();
                const update =
                  100 - Math.round(((clientX - left) / width) * 100);
                setColorValues([colorValues()[0], colorValues()[1], update]);
              }}
            >
              <div
                class="knob"
                style={{
                  left: `${100 - colorValues()[2]}%`,
                  background: `hsl(0, 0%, ${100 - colorValues()[2]}%)`,
                  "border-color": `hsl(0, 0%, ${colorValues()[2]}%)`,
                }}
              />
            </div>
          </div>
        )}
      </div>
      <ValueView value={mprops.value} />
    </div>
  );
}

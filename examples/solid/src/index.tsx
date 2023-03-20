import "./index.scss";
import { render, For, Index } from "solid-js/web";
import { createStore } from "solid-js/store";
import {
  ColorPicker,
  ColorSelector,
  Slider,
  InputField,
} from "@potzblitz/components/src/solid";
import { createSignal } from "solid-js";

function App() {
  const [store, updateStore] = createStore({ v: 10 });
  const [sliders, updateSliders] = createSignal([0, 0, 0]);
  const [colors, updateColors] = createSignal(["", "", ""]);

  return (
    <div class="ui-root">
      <h1>Solid × Potzblitz</h1>
      <ColorPicker value="#ff0000" />
      <ColorSelector label="backgroundColor" value="#00ff00" />
      <Slider
        value={store["v"]}
        min={0}
        max={20}
        step={0.01}
        onUpdate={(v) => updateStore("v", v)}
      />
      <InputField value={store["v"]} min={0} max={20} step={0.01} />

      <Index each={colors()}>
        {(v, i) => {
          return (
            <div>
              <ColorSelector label={`color-${i}`} />
            </div>
          );
        }}
      </Index>

      <Index each={sliders()}>
        {(v, i) => {
          return (
            <div>
              <Slider
                label="Slider"
                value={v}
                onUpdate={(v: number) => {
                  const update = [...sliders()];
                  update[i] = v;
                  updateSliders(update);
                }}
              />
              <span>Value: {v}</span>
            </div>
          );
        }}
      </Index>
      <code>{JSON.stringify(sliders())}</code>

      <Index each={sliders()}>
        {(v, i) => {
          return (
            <div>
              <Slider
                label="Slider"
                value={v}
                onUpdate={(v: number) => {
                  const update = [...sliders()];
                  update[i] = v;
                  updateSliders(update);
                }}
              />
              <span>Value: {v}</span>
            </div>
          );
        }}
      </Index>
    </div>
  );
}

render(App, document.body);

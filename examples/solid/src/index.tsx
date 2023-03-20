import "./index.scss";
import { render, For, Index } from "solid-js/web";
import { createStore } from "solid-js/store";
import { ColorPicker, InputField, Button, Slider } from "@potzblitz/components";
import { createSignal } from "solid-js";
import { Counter } from "./Counter";
import { Test, enableHydration } from "@potzblitz/solid-components/lib";

enableHydration();

function App() {
  const [store, updateStore] = createStore({ v: 10 });
  const [sliders, updateSliders] = createSignal([0, 0, 0]);
  const [counter, setCounter] = createSignal(0);

  return (
    <div class="app">
      <h1>Solid × Potzblitz</h1>
      <Counter value={counter()} onClick={() => setCounter(counter() + 1)} />
      <Counter value={counter()} onClick={() => setCounter(counter() + 10)} />
      <ColorPicker value="#ff0000" />
      <Test value={() => counter()} />
      <Slider
        value={store["v"]}
        min={0}
        max={20}
        step={0.01}
        onUpdate={(v) => updateStore("v", v)}
      />
      <InputField value={store["v"]} min={0} max={20} step={0.01} />

      <Index each={sliders()}>
        {(v, i) => {
          return (
            <div>
              <Slider
                label="Slider"
                value={v()}
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

      <Index each={sliders()}>
        {(v, i) => {
          return (
            <div>
              <Slider
                label="Slider"
                value={v()}
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

      <Button
        label="Randomize"
        onClick={() => {
          updateSliders((old) => old.map((_) => Math.random() * 100));
        }}
      />

      <code>{JSON.stringify(sliders())}</code>
    </div>
  );
}

render(App, document.body);

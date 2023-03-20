import "./index.scss";
import { render, For, Switch, Match, Index } from "solid-js/web";
import { createStore } from "solid-js/store";
import {
  ColorPicker,
  ColorSelector,
  NumberInputField,
  StringInputField,
  Toggle,
  Button,
  Slider,
} from "@potzblitz/components/src/solid";
import { createSignal } from "solid-js";

function App() {
  const [store, updateStore] = createStore({
    ["@life"]: {
      component: "slider",
      min: 0,
      max: 1.0,
      step: 0.1,
    },
    life: 40,
    name: "William",
    showText: true,
    ["@background"]: {
      component: "colorselector",
    },
    background: "#F0F",
    test: () => alert("WHAT?"),
  });
  const [sliders, updateSliders] = createSignal([0, 0, 0]);

  return (
    <div>
      <h1>Solid × Potzblitz</h1>
      <div class="ui-root">
        <ColorPicker label="color #1" value="#ff0000" />
        <ColorSelector label="color #2" value="#ff0000" />

        <For each={Object.keys(store).filter((key) => !key.includes("@"))}>
          {(key: string) => {
            const _type = typeof store[key];
            const _options = store[`@${key}`];
            return (
              <div class="group">
                <Switch>
                  <Match when={_options?.component === "colorselector"}>
                    <ColorSelector label={key} value={store[key]} />
                  </Match>

                  <Match when={_options?.component === "slider"}>
                    <Slider
                      label={key}
                      value={store[key]}
                      onUpdate={(v: number) => updateStore(key, v)}
                    />
                  </Match>

                  <Match when={_type === "number"}>
                    <NumberInputField
                      label={key}
                      value={store[key]}
                      onInput={(v: number) => updateStore(key, v)}
                    />
                  </Match>

                  <Match when={_type === "string"}>
                    <StringInputField
                      label={key}
                      value={store[key]}
                      onInput={(v: string) => updateStore(key, v)}
                    />
                  </Match>

                  <Match when={_type === "boolean"}>
                    <Toggle
                      label={key}
                      value={store[key]}
                      onChange={(v: boolean) => updateStore(key, v)}
                    />
                  </Match>

                  <Match when={_type === "function"}>
                    <Button label={key} onClick={store[key]} />
                  </Match>
                </Switch>
              </div>
            );
          }}
        </For>

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

        <code class="debug">{JSON.stringify(store)}</code>
      </div>
    </div>
  );
}

render(App, document.body);

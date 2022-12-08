import "../styles/new.scss";
import {
  Button,
  InputField,
  Potentiometer,
  Slider,
  Toggle,
  Select,
  ColorPicker,
} from "@potzblitz/components/src/solid";
import { mergeProps, For, Switch, Match } from "solid-js";

function UI(props: { class: string; context: object }) {
  const mprops = mergeProps({ class: "ui", context: {} }, props);

  const keys = () =>
    Object.keys(mprops.context).filter((key: string) => !key.includes("@"));

  const getValue = (key: string) => mprops.context[key];

  const getType = (key: string) => {
    const entry = mprops.context[key];
    const componentType = mprops.context[`@${key}.component`];
    if (componentType !== undefined) {
      return componentType;
    }
    const nativeType = typeof entry;
    switch (nativeType) {
      case "boolean":
        return nativeType;
      case "number":
        return nativeType;
      case "string":
        const isColorStr = entry.match(/^#?([0-9a-f]{6}|[0-9a-f]{3})$/i);
        return isColorStr ? "color" : nativeType;
      case "object":
        const isArray = Array.isArray(entry);
        return isArray ? "array" : nativeType;
      case "function":
        return nativeType;
    }
  };

  const handleChange = (key: string, v: any) => {
    const onChange = getValue(`@change`);
    mprops.context[key] = v;
    onChange && onChange(key, v);
  };

  return (
    <div class={mprops.class}>
      <For each={keys()}>
        {(key: string, i: () => number) => {
          const ofType = getType(key);
          const value = getValue(key);
          const min = getValue(`@${key}.min`) || 0;
          const max = getValue(`@${key}.max`) || 100;
          const step = getValue(`@${key}.step`) || 1;
          return (
            <Switch fallback={<></>}>
              <Match when={ofType === "boolean"}>
                <div class="element">
                  <Toggle
                    label={key}
                    value={value}
                    onChange={(newV) => handleChange(key, newV)}
                  />
                </div>
              </Match>

              <Match when={ofType === "color"}>
                <div class="element">
                  <ColorPicker
                    label={key}
                    value={value}
                    onSelect={(newV) => handleChange(key, newV)}
                  />
                </div>
              </Match>

              <Match when={ofType === "string"}>
                <div class="element">
                  <InputField
                    label={key}
                    value={value}
                    onChange={(newV) => handleChange(key, newV)}
                  />
                </div>
              </Match>

              <Match when={ofType === "number"}>
                <div class="element">
                  <InputField
                    label={key}
                    value={value}
                    onChange={(newV) => handleChange(key, newV)}
                  />
                </div>
              </Match>

              <Match when={ofType === "function"}>
                <div class="element">
                  <Button label={key} onClick={value} />
                </div>
              </Match>

              <Match when={ofType === "slider"}>
                <div class="element">
                  <Slider
                    label={key}
                    value={value}
                    min={min}
                    max={max}
                    step={step}
                    onUpdate={(newV) => handleChange(key, newV)}
                  />
                </div>
              </Match>

              <Match when={ofType === "potentiometer"}>
                <div class="element">
                  <Potentiometer
                    label={key}
                    value={value}
                    onUpdate={(newV) => handleChange(key, newV)}
                  />
                </div>
              </Match>

              <Match when={ofType === "select"}>
                <div class="element">
                  <Select
                    label={key}
                    value={value}
                    options={getValue(`@${key}.options`)}
                    onUpdate={(newV) => handleChange(key, newV)}
                  />
                </div>
              </Match>
            </Switch>
          );
        }}
      </For>
    </div>
  );
}

export { UI };

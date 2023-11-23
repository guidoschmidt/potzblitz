import { For } from "solid-js";
import { Button, Slider, NumberInputField } from "../lib";

const meta = {
  title: "Example/Complex",
  tags: ["autodocs"],
};

export default meta;

export const ComplexExample = () => {
  return (
    <div>
      <Button label="Click Me" />
      <For each={new Array(3).fill(0)}>
        {(key, i) => {
          return (
            <Slider
              label={`Slider ${i()}`}
              value={i() * Math.random()}
              step={0.01 * (i() + 1)}
              min={0}
              max={1}
            />
          );
        }}
      </For>
    </div>
  );
};

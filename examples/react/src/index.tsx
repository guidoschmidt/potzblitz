import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Button,
  Slider,
  InputField,
  ColorPicker,
  Potentiometer,
  Select,
} from "@potzblitz/components/src/react";

enum Shape {
  RECTANGLE,
  CIRCLE,
  SQUARE,
}

function App() {
  const [state, updateState] = useState({
    slider: 0,
    onButton: () => alert("Button!"),
    inputField: 10,
    color: "#ff0000",
  });

  return (
    <div>
      <h1>React Potzblitz</h1>
      <Slider
        label={"Slider"}
        value={state.slider}
        min={0}
        max={1000}
        step={1}
        onUpdate={(v: number) =>
          updateState((state) => {
            state.slider = v;
            return state;
          })
        }
      />
      <Button label="Test" />
      <InputField value={state.inputField} />
      <ColorPicker label="Color" value={state.color} />
      <Potentiometer value={12} />
      <Select
        label="Shape"
        value={Shape.CIRCLE}
        options={Object.keys(Shape).filter((o) => isNaN(parseInt(o)))}
      />
    </div>
  );
}

const root = createRoot(document.querySelector(".mount"));
root.render(<App />);

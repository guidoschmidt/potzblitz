import "@potzblitz/styles";
import "@potzblitz/react-components/dist/style.css";

import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  InputField,
  ColorPicker,
  ColorSelector,
  Potentiometer,
  Slider,
  Toggle,
} from "@potzblitz/react-components/lib";

class MyObject {
  x: number = 3;
  t: string = "Test";
  c: string = "#00ff00";
  m: number = 100;
  b: boolean = true;
}

const anotherObj = {
  x: "Test",
  bb: true,
  sameStuff: 12,
};

const inst = new MyObject();

const typeMap = new Map<string, Function>();
typeMap.set("number", Slider);
typeMap.set("string", InputField);
typeMap.set("color", ColorSelector);
typeMap.set("boolean", Toggle);

const App = ({ obj }) => {
  const [state, setState] = useState(obj);

  return (
    <React.Fragment>
      <h1>@potzblitz/react-uibuilder</h1>
      <div className="potzblitz ui-root">
        {Object.keys(state).map((key) => {
          const value = state[key] ?? undefined;
          let mappedType = typeof value;
          if (mappedType === "string" && value.includes("#")) {
            mappedType = "color";
          }
          const Component = typeMap.get(mappedType);
          return (
            <div key={key}>
              <span>{JSON.stringify(Component)}</span>
              {Component && (
                <Component
                  label={key}
                  value={value}
                  onUpdate={(v) => {
                    setState((oldState) => {
                      oldState[key] = v;
                      return oldState;
                    });
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      <code>{JSON.stringify(state)}</code>
    </React.Fragment>
  );
};

const mount = createRoot(document.querySelector("#mount"));
mount.render(<App obj={inst} />);

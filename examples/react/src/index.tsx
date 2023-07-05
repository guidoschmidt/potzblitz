import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  Button,
  Slider,
  ColorPicker,
  ColorSelector,
} from "@potzblitz/react-components";
import "@potzblitz/styles";
import "./styles.scss";
import "@potzblitz/react-components/dist/style.css";

const componentMap = new Map<string, any>();
componentMap.set("number", Slider);
componentMap.set("function", Button);
componentMap.set("string", ColorSelector);

const ViewState = ({ state }) => <code>{JSON.stringify(state)}</code>;

function App() {
  const [state, updateState] = useState({
    slider: 0,
    save: () => alert("Save from Button!"),
    inputField: 10,
    color: "#ff0000",
  });

  return (
    <React.Fragment>
      <h1>React Potzblitz</h1>
      <div className="ui-root">
        {Object.keys(state).map((key: string) => {
          const value = state[key];
          const nativeType = typeof state[key];
          const Component = componentMap.get(nativeType) ?? (
            <span>No Component</span>
          );
          return (
            <div key={key}>
              <Component
                label={key}
                value={value}
                onClick={typeof value === "function" ? value : null}
                onUpdate={(v) => {
                  updateState((o) => {
                    const update = { ...o };
                    update[key] = v;
                    return update;
                  });
                }}
              />
            </div>
          );
        })}
      </div>

      <ViewState state={state} />
    </React.Fragment>
  );
}

const root = createRoot(document.querySelector(".mount"));
root.render(<App />);

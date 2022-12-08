import { useState } from "react";
import { Slider, Button, Potentiometer } from "./components";
// Style
import "../styles/knobs.scss";

function Knobs({ settings }: { settings: object }) {
  const [settingsO, setSettingsO] = useState(settings);

  return (
    <div className="knobs knobs-theme">
      <h1>Knobs</h1>
      <div>{JSON.stringify(settingsO)}</div>
      <Button
        name="button"
        onclick={() => {
          alert("Button");
        }}
      />
      <Potentiometer name={"rotation"} value={50} />
      <Slider
        name="count"
        value={settings["count"]}
        ctx={settings}
        onupdate={(nv) => {
          console.log(nv);
          setSettingsO((prevState) => {
            const update = Object.assign({}, prevState, { count: nv });
            return update;
          });
        }}
      />
    </div>
  );
}

export { Knobs };

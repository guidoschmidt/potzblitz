import { render } from "solid-js/web";
import { ColorPicker, Slider } from "@potzblitz/components/src/solid";

function App() {
  return (
    <div class="app">
      <h1>Solid × Potzblitz</h1>
      <ColorPicker value="#ff0000" />
      <Slider value={10} min={0} max={20} step={0.01}></Slider>
    </div>
  );
}

render(App, document.body);

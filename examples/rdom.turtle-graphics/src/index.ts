import "./styles.scss";
import { line, circle } from "@thi.ng/geom";
import { $compile } from "@thi.ng/rdom";
import { maddN, add2, rotate, degrees, radians } from "@thi.ng/vectors";
import { $canvas } from "@thi.ng/rdom-canvas";
import { map, cycle, take } from "@thi.ng/transducers";
import { fromDOMEvent, sync } from "@thi.ng/rstream";
import { ui } from "./settings";

const deg2rad = Math.PI / 180.0;

const size = fromDOMEvent(window, "resize").transform(map(() => [1024, 1024]));
size.next(<any>null);

const render = sync({ src: { state: ui.stream } }).transform(
  map(({ state }) => {
    const { steps, repeat, centerX, centerY } = state;
    const [width, height] = size.deref();
    let pos = [centerX, centerY];
    let dir = [1, 0];
    const drawing = [...take(repeat * steps.length, cycle(steps))].map(
      (step) => {
        switch (step.command) {
          case "F": {
            const start = pos;
            const end = [...pos];
            maddN(end, dir, step.forward, start);
            const l = line(start, end, {
              stroke: step.color,
            });
            pos = end;
            return l;
          }

          case "f": {
            const start = pos;
            const end = [...pos];
            maddN(end, dir, step.forward, start);
            pos = end;
            break;
          }

          case "-": {
            const rot = [...dir];
            rotate(rot, dir, -step.angle * deg2rad);
            dir = rot;
            break;
          }

          case "+": {
            const rot = [...dir];
            rotate(rot, dir, step.angle * deg2rad);
            dir = rot;
            break;
          }
        }
      }
    );
    return [
      "g",
      {
        __clear: true,
        translate: [width * 0.5, height * 0.5],
      },
      ["circle", { fill: "#000" }, pos, 5],
      ...drawing,
    ];
  })
);

const canvas = $canvas(render, size);

const sketch = ["div.turtle-gfx", {}, canvas];

$compile(sketch).mount(document.body);

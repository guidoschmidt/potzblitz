import { colorFromRange, css, hsv } from "@thi.ng/color";
import { Potzblitz } from "@potzblitz/rdom";

const commands = ["F", "f", "+", "-"];

const step = {
  command: "F",
  ["@command"]: {
    component: "select",
    options: commands,
  },
  color: "#eee",
  ["@color"]: {
    component: "colorpicker",
    hide: (s) => s.command !== "F" && s.command !== "f",
  },
  forward: 250,
  ["@forward"]: {
    component: "slider",
    min: 0,
    max: 500,
    step: 1,
    hide: (s) => s.command !== "F" && s.command !== "f",
  },
  angle: 100,
  ["@angle"]: {
    component: "slider",
    min: -180,
    max: 180,
    step: 0.01,
    hide: (s) => s.command !== "-" && s.command !== "+",
  },
};

export const state = {
  repeat: 300,
  centerX: +50,
  ["@centerX"]: {
    component: "slider",
    min: -500,
    max: 500,
  },
  centerY: -50,
  ["@centerY"]: {
    component: "slider",
    min: -500,
    max: 500,
  },
  scale: 1.0,
  ["@scale"]: {
    component: "slider",
    min: 0.01,
    max: 5.0,
    step: 0.1,
  },
  addStep: () => {
    ui.update({
      steps: [...ui.state.steps, step],
    });
  },
  randomize: () => randomStart(),
  steps: [],
};

const randomStart = () => {
  const count = 100 + Math.round(Math.random() * 300);
  const randomSteps = new Array(count).fill(0).map((_) => {
    const newStep = { ...step };
    newStep.command = commands[Math.floor(Math.random() * commands.length)];
    newStep.angle = Math.round(Math.random() * 360 - 180);
    newStep.forward = Math.round((Math.random() - 0.5) * 100);
    newStep.color = css(colorFromRange("bright"));
    return newStep;
  });
  ui.update({ ...ui.state, ...{ steps: randomSteps } });
};

export const ui = new Potzblitz(state);

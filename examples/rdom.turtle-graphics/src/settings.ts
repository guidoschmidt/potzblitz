import { Potzblitz } from "@potzblitz/rdom";

const commands = ["F", "f", "+", "-"];

export const state = {
  repeat: 10,
  centerX: +50,
  centerY: -50,
  addStep: () => {
    ui.update({
      steps: [
        ...ui.state.steps,
        {
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
        },
      ],
    });
  },
  steps: [],
};

export const ui = new Potzblitz(state);

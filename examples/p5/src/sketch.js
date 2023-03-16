import p5 from "p5";
import { Potzblitz } from "@potzblitz/ui/src/hdom";
import "./style.scss";

const settings = {
  ["@change"]: () => sketch?.draw(),
  frame: 0,
  seed: 0,
  ["@backgroundColor.component"]: "color",
  backgroundColor: "#531edb",
  ["@foregroundColor.component"]: "color",
  foregroundColor: "#eee9fc",
  ["@balance.component"]: "potentiometer",
  ["@balance.step"]: 1,
  ["@balance.min"]: 0,
  ["@balance.max"]: 0,
  balance: 50,
  tileCount: 30,
  ["@strokeWidth.component"]: "slider",
  ["@strokeWidth.min"]: 1,
  ["@strokeWidth.max"]: 20,
  ["@strokeWidth.step"]: 0.1,
  strokeWidth: 5,
  invert: false,
  ["@rotation.component"]: "slider",
  ["@rotation.min"]: 0,
  ["@rotation.max"]: 360,
  ["@rotation.layout"]: "span 2",
  rotation: 0,
  ["@passpartout.columns"]: 1,
  passpartout: {
    ["@color.component"]: "color",
    color: "#3e16a3",
    ["@border.columns"]: 1,
    border: {
      ["@left.component"]: "slider",
      left: 100,
      ["@right.component"]: "slider",
      right: 100,
      ["@top.component"]: "slider",
      top: 100,
      ["@bottom.component"]: "slider",
      bottom: 100,
    },
  },
  fullscreen: () => {
    let fs = sketch?.fullscreen();
    sketch?.fullscreen(!fs);
  },
  fullscreenCanvas: () => {
    document.querySelector("canvas").requestFullscreen();
  },
  ["@download.layout"]: "span 2",
  download: () => sketch.saveCanvas(`${Date.now()}`, "png"),
};

const potzblitz = new Potzblitz(settings);

const sketch = new p5((p) => {
  p.setup = () => {
    p.createCanvas(800, 800);
    p.randomSeed(Date.now());
  };

  p.draw = () => {
    const {
      seed,
      invert,
      strokeWidth,
      backgroundColor,
      tileCount,
      balance,
      foregroundColor,
    } = potzblitz.snapshot;

    p.push();
    p.translate(+p.width * 0.5, +p.height * 0.5);
    p.rotate(p.radians(potzblitz.snapshot.rotation));
    p.translate(-p.width * 0.5, -p.height * 0.5);
    p.randomSeed(seed);
    p.background(invert ? foregroundColor : backgroundColor);

    // 10 PRINT
    for (let x = 0; x < tileCount; x++) {
      for (let y = 0; y < tileCount; y++) {
        const xSize = p.width / (tileCount - 1);
        const ySize = p.width / (tileCount - 1);
        const xStart = x * xSize;
        const yStart = y * ySize;
        const xEnd = xStart + xSize;
        const yEnd = yStart + ySize;
        const rand = p.random(0, 1) > balance / 100;
        p.stroke(invert ? backgroundColor : foregroundColor);
        p.strokeWeight(strokeWidth);
        if (rand) {
          p.line(xStart, yStart, xEnd, yEnd);
        } else {
          p.line(xStart, yEnd, xEnd, yStart);
        }
      }
    }
    p.pop();

    // Passpartout
    const { border, color: passpartoutColor } = potzblitz.snapshot.passpartout;
    p.fill(passpartoutColor);
    p.noStroke();
    p.rect(0, 0, border.left, p.height);
    p.rect(p.width - border.right, 0, border.right, p.height);
    p.rect(0, 0, p.width, border.top);
    p.rect(0, p.height, p.width, -border.bottom);
  };
});

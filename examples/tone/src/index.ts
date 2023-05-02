import * as Tone from "tone";
import { Potzblitz } from "@potzblitz/rdom";

enum WaveTypes {
  SINE = "sine",
  SQUARE = "square",
  TRIANGLE = "triangle",
  SAWTOOTH = "sawtooth",
}

const synth = new Tone.MonoSynth({
  oscillator: {
    type: "sine",
    volume: 0,
  },
});
synth.toDestination();

const stepCount = 256;
const fft = new Tone.FFT(stepCount);
synth.connect(fft);

const settings = {
  start: () => synth.triggerAttack("C3"),
  stop: () => synth.triggerRelease(),
  volume: 0,
  ["@volume"]: {
    component: "slider",
    min: -36,
    max: 1,
    step: 0.1,
  },
  waveType: WaveTypes.SINE,
  ["@waveType"]: {
    component: "select",
    options: Object.values(WaveTypes),
  },
};

const ui = new Potzblitz(settings);
ui.onChange("waveType", () => {
  synth.oscillator.type = ui.state.waveType;
  synth.oscillator.volume.value = ui.state.volume;
});

const canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 800;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d") ?? null;

function renderLoop() {
  const vals = fft.getValue();
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.strokeStyle = "#ffffff";
  ctx.moveTo(0, 400);
  const step = canvas.width / stepCount;
  for (var i = 1; i <= stepCount; i++) {
    const fftVal = Math.max(Math.min(vals[i], 400), -400);
    ctx.lineTo(i * step, 400 + fftVal);
  }
  ctx.stroke();
  requestAnimationFrame(renderLoop);
}

renderLoop();

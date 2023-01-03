import * as Tone from "tone";
import { UiRoot } from "@potzblitz/ui";

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

const settings = {
  start: () => synth.triggerAttack("C3"),
  stop: () => synth.triggerRelease(),
  ["@volume.component"]: "slider",
  ["@volume.min"]: -36,
  ["@volume.max"]: 1,
  ["@volume.step"]: 0.1,
  volume: 0,
  ["@waveType.component"]: "select",
  ["@waveType.options"]: Object.values(WaveTypes),
  waveType: WaveTypes.SINE,
  ["@change"]: () => {
    synth.oscillator.type = settings.waveType;
    synth.oscillator.volume.value = settings.volume;
  },
};

const ui = new UiRoot();
ui.build("Synth", settings);

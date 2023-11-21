// import "@potzblitz/styles/lib/components/InputField.scss";
import {
  uniqueName,
  InputFieldProps,
  NumberInputFieldProps,
  TextInputFieldProps,
} from "@potzblitz/api";
import { mergeProps, createSignal, createEffect } from "solid-js";
import { CopyValueButton } from "./blocks";

interface solidInputFieldProps<T> extends InputFieldProps {
  value: T;
}

function NumberInput(props: NumberInputFieldProps) {
  return (
    <div class="input-wrapper">
      <button class="button step-button" onClick={props.handleDecrease}>
        -
      </button>
      <input
        type="number"
        id={props.id}
        value={props.value}
        onInput={props.onInput}
        onBlur={props.onBlur}
      />
      <button class="button step-button" onClick={props.handleIncrease}>
        +
      </button>
    </div>
  );
}

function TextInput(props: TextInputFieldProps) {
  return (
    <input
      class="input"
      id={props.id}
      type="text"
      value={props.value}
      onInput={props.handleInput}
      onBlur={props.handleBlur}
    />
  );
}

export function StringInputField(props: solidInputFieldProps<string>) {
  const mprops: solidInputFieldProps<string> = mergeProps(
    {
      label: "",
      value: "",
      onInput: () => {},
      onBlur: () => {},
      step: 1,
      min: -Infinity,
      max: +Infinity,
    },
    props,
  );
  const [idStr, _id] = uniqueName(mprops.label);
  const [vO, setVO] = createSignal(mprops.value);

  let inputFieldRef: HTMLInputElement;

  createEffect(() => {
    setVO(mprops.value);
  });

  const handleInput = (v: string) => {
    setVO(v);
    return v;
  };

  const handleBlur = () => {
    mprops.onBlur && mprops.onBlur(vO());
  };

  return (
    <div
      classList={{ inputfield: true, ...mprops.classList }}
      ref={inputFieldRef}
    >
      {mprops.label && <label>{mprops.label}</label>}
      <TextInput
        id={idStr}
        value={vO() as string}
        handleInput={(e: InputEvent) => {
          const target = e.target as HTMLInputElement;
          const v = handleInput(String(target.value));
          mprops.onInput && mprops.onInput(v);
        }}
        handleBlur={handleBlur}
      />
      {mprops.showCopyButton && <CopyValueButton value={vO()} />}
    </div>
  );
}

export function NumberInputField(props: solidInputFieldProps<number>) {
  const mprops: solidInputFieldProps<number> = mergeProps(
    {
      label: "",
      value: 0,
      onInput: () => {},
      onBlur: () => {},
      step: 1,
      min: -Infinity,
      max: +Infinity,
    },
    props,
  );
  const [idStr, _id] = uniqueName(mprops.label);
  const [vO, setVO] = createSignal(mprops.value);

  let inputFieldRef: HTMLInputElement;

  const handleInput = (v: number) => {
    setVO(v);
    return v;
  };

  const handleChange = (newV: number) => {
    mprops.onInput && mprops.onInput(newV);
  };

  const handleBlur = () => {
    mprops.onBlur && mprops.onBlur(vO());
  };

  const clamp = (v: number, min: number, max: number): number =>
    Math.min(Math.max(v, min), max);

  return (
    <div
      classList={{ inputfield: true, ...mprops.classList }}
      ref={inputFieldRef}
    >
      {mprops.label && <label>{mprops.label}</label>}
      <NumberInput
        id={idStr}
        value={vO() as number}
        handleInput={(e: InputEvent) => {
          const target = e.target as HTMLInputElement;
          handleChange(handleInput(parseFloat(target.value) as number));
        }}
        handleBlur={handleBlur}
        handleIncrease={() => {
          setVO(clamp((vO() as number) + mprops.step, mprops.min, mprops.max));
          mprops.onInput && mprops.onInput(vO());
        }}
        handleDecrease={() => {
          setVO(clamp((vO() as number) - mprops.step, mprops.min, mprops.max));
          mprops.onInput && mprops.onInput(vO());
        }}
      />
      {mprops.showCopyButton && <CopyValueButton value={vO()} />}
    </div>
  );
}

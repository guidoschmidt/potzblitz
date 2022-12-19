import "../scss/InputField.scss";
import { mergeProps, createSignal, createEffect } from "solid-js";
import {
  uniqueName,
  InputFieldProps,
  NumberInputFieldProps,
  TextInputFieldProps,
} from "../api";
import { CopyValueButton } from "./blocks";

function NumberInput(props: NumberInputFieldProps) {
  return (
    <>
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
    </>
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

export function InputField(props: InputFieldProps) {
  const mprops: InputFieldProps = mergeProps(
    {
      value: "",
      onChange: () => {},
      onBlur: () => {},
      step: 1,
      min: -Infinity,
      max: +Infinity,
    },
    props
  );
  const [idStr, _id] = uniqueName(mprops.label);
  const [vO, setVO] = createSignal(mprops.value);

  let inputFieldRef: HTMLInputElement;

  createEffect(() => {
    setVO(mprops.value);
  });

  const handleInput = (v: number | string) => {
    setVO(v);
    return v;
  };

  const handleChange = (newV: number | string) => {
    mprops.onInput && mprops.onInput(newV);
  };

  const handleBlur = () => {
    mprops.onBlur && mprops.onBlur(vO());
  };

  const clamp = (v: number, min: number, max: number): number =>
    Math.min(Math.max(v, min), max);

  return (
    <div class="inputfield" ref={inputFieldRef}>
      {mprops.label && <label>{mprops.label}</label>}
      {typeof mprops.value === "string" ? (
        <TextInput
          id={idStr}
          value={vO() as string}
          handleInput={(e: InputEvent) => {
            const target = e.target as HTMLInputElement;
            handleInput(String(target.value));
          }}
          handleBlur={handleBlur}
        />
      ) : (
        <NumberInput
          id={idStr}
          value={vO() as number}
          handleInput={(e: InputEvent) => {
            const target = e.target as HTMLInputElement;
            handleChange(handleInput(parseFloat(target.value) as number));
          }}
          handleBlur={handleBlur}
          handleIncrease={() => {
            setVO(
              clamp((vO() as number) + mprops.step, mprops.min, mprops.max)
            );
            mprops.onInput && mprops.onInput(vO());
          }}
          handleDecrease={() => {
            setVO(
              clamp((vO() as number) - mprops.step, mprops.min, mprops.max)
            );
            mprops.onInput && mprops.onInput(vO());
          }}
        />
      )}
      {mprops.showCopyButton && <CopyValueButton value={vO()} />}
    </div>
  );
}

import "../scss/InputField.scss";
import React, { useState } from "react";
import {
  uniqueName,
  InputFieldProps,
  NumberInputFieldProps,
  TextInputFieldProps,
} from "../api";

function NumberInput(props: NumberInputFieldProps) {
  return (
    <>
      <button className="button step-button" onClick={props.handleDecrease}>
        -
      </button>
      <input
        type="number"
        value={props.value}
        onInput={props.handleInput}
        onBlure={props.handleBlur}
      />
      <button className="button step-button" onClick={props.handleIncrease}>
        +
      </button>
    </>
  );
}

function TextInput(props: TextInputFieldProps) {
  return (
    <input
      id={props.id}
      type="text"
      value={props.value}
      onInput={props.handleInput}
      onBlur={props.handleBlur}
    />
  );
}

export function InputField(props: InputFieldProps) {
  const [idStr, _id] = uniqueName(props.label);

  const [vO, setVO] = useState<number | string>(
    parseFloat(props.value as string) || props.value
  );

  const handleInput = (v: number | string) => {
    setVO(v);
    return v;
  };

  const handleChange = (newV: number | string) => {
    props.onInput && props.onInput(newV);
  };

  const handleBlur = () => {
    props.onBlur && props.onBlur(0);
  };

  const clamp = (v: number, min: number, max: number): number =>
    Math.min(Math.max(v, min), max);

  return (
    <div class="inputfield">
      {props.label && <label>{props.label}</label>}
      {typeof vO === "string" ? (
        <TextInput
          id={idStr}
          value={vO as string}
          handleInput={(e: InputEvent) => {
            const target = e.target as HTMLInputElement;
            handleInput(String(target.value));
          }}
        />
      ) : (
        <NumberInput
          id={idStr}
          value={vO as number}
          handleInput={(e: InputEvent) => {
            const target = e.target as HTMLInputElement;
            handleChange(handleInput(parseFloat(target.value) as number));
          }}
          handleBlur={handleBlur}
          handleIncrease={() => {
            const newVO = clamp(
              (vO as number) + (props.step || 1),
              props.min || -Infinity,
              props.max || +Infinity
            );
            setVO(newVO);
            props.onInput && props.onInput(vO);
          }}
          handleDecrease={() => {
            const newVO = clamp(
              (vO as number) - (props.step || 1),
              props.min || -Infinity,
              props.max || +Infinity
            );
            setVO(newVO);
            props.onInput && props.onInput(vO);
          }}
        />
      )}
      <button class="button copy-value">●</button>
    </div>
  );
}

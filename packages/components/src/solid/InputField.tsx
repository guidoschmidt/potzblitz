import "../scss/InputField.scss";
import { mergeProps, createSignal, createEffect } from "solid-js";
import { uniqueName, InputFieldProps } from "../api";
import { CopyValueButton } from "./blocks";

function NumberInput(props) {
  return (
    <>
      <button class="button step-button" onClick={props.onDecrease}>
        -
      </button>
      <input
        type="number"
        id={props.id}
        value={props.value}
        onInput={props.handleInput}
        onBlur={props.handleBlur}
      />
      <button class="button step-button" onClick={props.onIncrease}>
        +
      </button>
    </>
  );
}

function TextInput(props) {
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
    { value: "", onChange: () => {}, onBlur: () => {} },
    props
  );
  const [idStr, _id] = uniqueName(mprops.label);
  const [vO, setVO] = createSignal(mprops.value);

  let inputFieldRef: HTMLInputElement;

  createEffect(() => {
    setVO(mprops.value);
  });

  const handleInput = (e: InputEvent) => {
    const target = e.target as HTMLInputElement;
    setVO(target.value);
    return target.value;
  };

  const handleChange = (newV: any) => {
    mprops.onChange && mprops.onChange(newV);
  };

  const handleBlur = () => {
    mprops.onBlur && mprops.onBlur(vO());
  };

  return (
    <div class="input-field" ref={inputFieldRef}>
      {mprops.label && <label>{mprops.label}</label>}
      {isNaN(vO()) ? (
        <TextInput
          id={idStr}
          value={vO()}
          handleInput={handleInput}
          handleBlur={handleBlur}
        />
      ) : (
        <NumberInput
          id={idStr}
          value={vO()}
          handleInput={(e: InputEvent) =>
            handleChange(parseFloat(handleInput(e)))
          }
          handleBlur={handleBlur}
          onIncrease={() => {
            setVO(vO() + 1);
            mprops.onChange && mprops.onChange(vO());
          }}
          onDecrease={() => {
            setVO(vO() - 1);
            mprops.onChange && mprops.onChange(vO());
          }}
        />
      )}
      <CopyValueButton value={vO()} />
    </div>
  );
}

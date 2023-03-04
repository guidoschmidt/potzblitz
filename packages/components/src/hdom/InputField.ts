import "../scss/InputField.scss";
import { camelCaseWithSpaces, InputFieldProps, uniqueName } from "../api";
import { type View } from "@thi.ng/atom";

interface hdomInputFieldProps<T> extends InputFieldProps {
  value: View<T>;
}

export function NumberInputField(props: hdomInputFieldProps<number>) {
  return () => {
    const handleDecrease = () => {
      const newValue = props.value.deref() - (props.step || 1);
      props.onInput && props.onInput(newValue);
    };

    const handleInput = (e: InputEvent) => {
      const target = e.target as HTMLInputElement;
      const newValue = parseFloat(target.value);
      props.onInput && props.onInput(newValue);
    };

    const handleIncrease = () => {
      const newValue = props.value.deref() + (props.step || 1);
      props.onInput && props.onInput(newValue);
    };

    return [
      "div.inputfield",
      [props.label && ["label", camelCaseWithSpaces(props.label)]],
      ["button.button.step-button", { onclick: handleDecrease }, "-"],
      [
        "input",
        {
          type: "number",
          value: props.value.deref(),
          oninput: handleInput,
        },
      ],
      ["button.button.step-button", { onclick: handleIncrease }, "+"],
    ];
  };
}

export function StringInputField(props: hdomInputFieldProps<string>) {
  return () => {
    const handleInput = (e: InputEvent) => {
      const target = e.target as HTMLInputElement;
      const newValue = target.value;
      props.onInput && props.onInput(newValue);
    };

    return [
      "div.inputfield",
      [props.label && ["label", camelCaseWithSpaces(props.label)]],
      [
        `input`,
        { type: "text", value: props.value.deref(), oninput: handleInput },
      ],
    ];
  };
}

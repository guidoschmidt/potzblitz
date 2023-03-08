import "../scss/InputField.scss";
import { camelCaseWithSpaces, InputFieldProps } from "../api";
import { type View } from "@thi.ng/atom";

interface hdomNumberInputFieldProps extends InputFieldProps {
  value: View<number>;
  style: object;
}

interface hdomStringInputFieldProps extends InputFieldProps {
  value: View<string>;
  style: object;
}

function NumberInputField(props: hdomNumberInputFieldProps) {
  return () => {
    const handleDecrease = () => {
      const value = props.value.deref() - (props.step || 1);
      const div = props.step ? Math.pow(10, `${props.step}`.length - 1) : 1000;
      const fixedValue = Math.floor(value * div) / div;
      props.onInput && props.onInput(fixedValue);
    };

    const handleInput = (e: InputEvent) => {
      const target = e.target as HTMLInputElement;
      const newValue = parseFloat(target.value);
      props.onInput && props.onInput(newValue);
    };

    const handleIncrease = () => {
      const value = props.value.deref() + (props.step || 1);
      const div = props.step ? Math.pow(10, `${props.step}`.length - 1) : 1000;
      const fixedValue = Math.floor(value * div) / div;
      props.onInput && props.onInput(fixedValue);
    };

    return [
      "div.inputfield",
      { style: { ...props.style } },
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

function StringInputField(props: hdomStringInputFieldProps) {
  return () => {
    const handleInput = (e: InputEvent) => {
      const target = e.target as HTMLInputElement;
      const newValue = target.value;
      props.onInput && props.onInput(newValue);
    };

    return [
      "div.inputfield",
      { style: { ...props.style } },
      [props.label && ["label", camelCaseWithSpaces(props.label)]],
      [
        `input`,
        { type: "text", value: props.value.deref(), oninput: handleInput },
      ],
    ];
  };
}

export { NumberInputField, StringInputField };

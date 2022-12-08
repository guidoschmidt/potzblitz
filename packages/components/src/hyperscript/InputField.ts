import "../scss/InputField.scss";
import h from "hyperscript";
import {
  InputFieldProps,
  camelCaseWithSpaces,
  uniqueName,
  timeout,
} from "../api";
import { CopyValueButton } from "./blocks";
import { createSignal } from "./reactive";

function NumberInput(props) {
  return [
    h("button.button.step-button", { onclick: props.onDecrease }, "-"),
    h("input", {
      type: "number",
      id: props.id,
      value: parseFloat(props.value),
      oninput: props.handleInput,
      onblur: props.handleBlur,
    }),
    h("button.button.step-button", { onclick: props.onIncrease }, "+"),
  ];
}

export function InputField(props: InputFieldProps, ctx?: object) {
  const [idStr, _id] = uniqueName(props.label);

  const [vO, setVO] = createSignal(props.value);

  vO((v: string) => {
    if (ctx) ctx[props.label] = v;
    props.onChange && props.onChange(v);
  });

  const onchange = (e: InputEvent) => {
    const target = e.target as HTMLInputElement;
    setVO(target.value);
  };

  return h("div.input-field", [
    h("label", camelCaseWithSpaces(props.label)),
    typeof vO() === "string"
      ? h(`input#${idStr}`, {
          type: "text",
          value: props.value,
          onchange,
        })
      : NumberInput({
          id: idStr,
          value: parseFloat(vO()),
          hanldeInput: onchange,
          handleBlur: onchange,
          onIncrease: () => {
            setVO(parseFloat(vO()) + props.step || 1);
            const target: HTMLInputElement = document.querySelector(
              `#${idStr}`
            );
            target.value = vO();
            props.onChange && props.onChange(vO());
          },
          onDecrease: () => {
            setVO(parseFloat(vO()) - props.step || 1);
            const target: HTMLInputElement = document.querySelector(
              `#${idStr}`
            );
            target.value = vO();
            props.onChange && props.onChange(vO());
          },
        }),
    CopyValueButton({ value: vO }),
  ]);
}

//
//
//

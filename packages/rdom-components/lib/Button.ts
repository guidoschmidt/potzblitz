import "@potzblitz/components/src/scss/Button.scss";

export interface ButtonProps {
  label: string;
  onClick: () => any;
}

export function Button(props: ButtonProps) {
  return [
    "div.button-wrapper",
    {},
    ["button.button", { onclick: props.onClick }, props.label],
  ];
}

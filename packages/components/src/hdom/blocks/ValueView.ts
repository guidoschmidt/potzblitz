import "../../scss/blocks/ValueView.scss";

function ValueView(value: any) {
  return ["span.value-view", {}, value];
}

export { ValueView };

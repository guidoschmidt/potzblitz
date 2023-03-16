import "../../scss/blocks/ValueView.scss";

export function ValueView(props: { value: number }) {
  return <span class="value-view">{props.value}</span>;
}

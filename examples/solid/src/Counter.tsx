import { createSignal, createEffect } from "solid-js";

export function Counter(props: { value: number; onClick: Function }) {
  createEffect(() => {
    console.log("My effect says " + props.value);
  });

  console.log(props.value);

  return <button onClick={() => props.onClick()}>{props.value}</button>;
}

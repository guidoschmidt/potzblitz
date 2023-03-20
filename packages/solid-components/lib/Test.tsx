import { createEffect, createSignal } from "solid-js";

export function Test(props: { value: number }) {
  const [v, setV] = createSignal(props.value);

  createEffect(() => console.log(props));

  console.log(props);

  return <div>TEST {v()}</div>;
}

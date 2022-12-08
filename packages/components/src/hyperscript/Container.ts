import h from "hyperscript";

export function Container(
  className: string,
  inner: Array<HTMLElement> | HTMLElement
) {
  return h(`div${[".ui-container", className].join("")}`, inner);
}

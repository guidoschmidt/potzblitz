import React from "react";
import { camelCaseWithSpaces } from "../../utils";

export function Button({
  name,
  onclick,
}: {
  name: string;
  onclick: () => any;
}): HTMLElement {
  return <button onClick={onclick}>{camelCaseWithSpaces(name)}</button>;
}

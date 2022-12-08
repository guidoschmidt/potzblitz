import { v4 } from "uuid";
import { ComponentProps } from "./types";

export function camelCaseWithSpaces(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
}

export function uniqueName(label: string) {
  const id = v4();
  const properLabel = (label || "component").replace(" ", "-").toLowerCase();
  return [`${properLabel}-${id}`, id];
}

export const timeout = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function copyValue<T>(e: PointerEvent, value: T) {
  try {
    await navigator.clipboard.writeText(value.toString());
    const button = e.target as HTMLButtonElement;
    const innerText = button.innerText;
    button.innerText = "↑";
    await timeout(500);
    button.innerText = innerText;
  } catch {
    console.error(`Could not copy ${value} to clipboard.`);
  }
}

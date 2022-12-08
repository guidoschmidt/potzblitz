export function camelCaseWithSpaces(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
}

export function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export function remap(v: number, a: number, b: number, c: number, d: number) {
  const newVal = ((v - a) / (b - a)) * (d - c) + c;
  return newVal;
}

export const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

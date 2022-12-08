export function handleSliderInput(e: InputEvent, setValue: Function) {
  const target = e.target as HTMLInputElement;
  const newValue = parseFloat(target.value);
  setValue(newValue);
}

export interface ComponentProps {
  label?: string;
  disabled?: boolean;
  showCopyButton?: boolean;
  // @TODO How to differentiate between class & classList?
  classList?: object;
}

export interface SliderProps extends ComponentProps {
  min?: number;
  max?: number;
  step?: number;
  onUpdate?: (v: number) => void;
  onBlur?: (v: number) => void;
}

export interface ButtonProps extends ComponentProps {
  onClick?: () => void;
}

export interface ButtonPadProps extends ComponentProps {
  value?: number;
  onClick?: (i: number) => void;
  layout: [number, number];
}

export interface ColorPickerProps extends ComponentProps {
  onSelect?: (c: string) => void;
}

export interface ColorSelectorProps extends ComponentProps {
  onSelect?: (c: string) => void;
}

export interface InputFieldProps extends ComponentProps {
  min?: number;
  max?: number;
  step?: number;
  onInput?: (v: string | number) => void;
  onBlur?: (v: string | number) => void;
}

export interface TextInputFieldProps extends InputFieldProps {
  id: string;
  value?: string;
  min?: number;
  max?: number;
  step?: number;
  handleInput?: (e: InputEvent) => void;
  handleBlur?: (v: string) => void;
}

export interface NumberInputFieldProps extends InputFieldProps {
  id: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  handleInput?: (e: InputEvent) => void;
  handleBlur?: () => void;
  handleIncrease: () => void;
  handleDecrease: () => void;
}

export interface PotentiometerProps extends SliderProps {}

export interface ToggleProps extends ComponentProps {
  onChange?: (t: boolean) => void;
}

export interface SelectProps<T> extends ComponentProps {
  options?: Array<T>;
  onSelect?: (option: T, idx: number) => void;
  displayFn?: (o: T) => string;
}

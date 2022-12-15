export interface ComponentProps {
  label?: string;
  disabled?: boolean;
  showCopyButton?: boolean;
}

export interface SliderProps extends ComponentProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onUpdate?: (v: number) => void;
  onBlur?: (v: number) => void;
}

export interface ButtonProps extends ComponentProps {
  onClick?: () => void;
}

export interface ColorPickerProps extends ComponentProps {
  value?: string;
  onSelect?: (c: string) => void;
}

export interface InputFieldProps extends ComponentProps {
  value?: string | number;
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
  value?: boolean;
  onChange?: (t: boolean) => void;
}

export interface SelectProps<T> extends ComponentProps {
  value?: number;
  options?: Array<T>;
  onSelect?: (idx: number) => void;
}

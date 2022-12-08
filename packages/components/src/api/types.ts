export interface ComponentProps {
  label?: string;
  disabled?: boolean;
}

export interface SliderPros extends ComponentProps {
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
  step?: number;
  onChange?: (c: string) => void;
  onBlur?: (c: string) => void;
}

export interface PotentiometerProps extends SliderPros {}

export interface ToggleProps extends ComponentProps {
  value?: boolean;
  onChange?: (t: boolean) => void;
}

export interface SelectProps<T> extends ComponentProps {
  value?: T;
  options?: Array<T>;
  onSelect?: (v: T) => void;
}

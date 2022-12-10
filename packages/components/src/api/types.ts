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
  min?: number;
  max?: number;
  step?: number;
  onChange?: (v: string | number) => void;
  onBlur?: (v: string | number) => void;
}

export interface PotentiometerProps extends SliderPros {}

export interface ToggleProps extends ComponentProps {
  value?: boolean;
  onChange?: (t: boolean) => void;
}

export interface SelectProps<T> extends ComponentProps {
  value?: number;
  options?: Array<T>;
  onSelect?: (idx: number) => void;
}

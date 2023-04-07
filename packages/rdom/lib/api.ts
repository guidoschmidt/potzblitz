import { ComponentProps } from "@potzblitz/rdom-components";

type Key = string;
type AnnotationKey = `@${Key}`;

export interface StateObject {
  [k: Key]: any;
  [k: AnnotationKey]: any;
}

export type Annotation = {
  component?: string;
} & ComponentProps;

// @TODO
// enum NativeUiTypes {
//   Number,
//   String,
//   Function,
//   Object,
// }

// enum UiType {
//   Toggle,
//   Slider,
//   StringInputField,
//   NumberInputField,
// }

// const UiTypeMapping = new Map<Function, UiType>();

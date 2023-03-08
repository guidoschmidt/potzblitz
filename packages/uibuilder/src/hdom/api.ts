import { type View } from "@thi.ng/atom";

export type StructureEntry = {
  _type: string;
  componentType: string;
  layout: string;
  step: number;
  min: number;
  max: number;
  path: string;
  key: string;
  view?: View<any>;
};

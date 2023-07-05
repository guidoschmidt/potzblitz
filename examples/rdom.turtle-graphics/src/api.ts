import type { Fn0 } from "@thi.ng/api";

export type Command = {
  commandtype: string;
  length?: number;
  angle?: number;
  remove: Fn0;
  repeat: number;
};

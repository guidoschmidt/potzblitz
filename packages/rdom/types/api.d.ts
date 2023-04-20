import { ComponentProps } from "@potzblitz/rdom-components";
import { type ISubscription } from "@thi.ng/rstream";
type Key = string;
type AnnotationKey = `@${Key}`;
export interface StateObject {
    [k: Key]: any;
    [k: AnnotationKey]: any;
}
export type Annotation = {
    component?: string;
    getIsHidden: () => ISubscription<boolean, boolean>;
} & ComponentProps;
export {};

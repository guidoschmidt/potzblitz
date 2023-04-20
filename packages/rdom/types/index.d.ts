import "@potzblitz/styles/dist/index.css";
import "@potzblitz/rdom-components/dist/style.css";
import { Stream } from "@thi.ng/rstream";
import { StateObject } from "./api";
export declare class Potzblitz {
    private _stateAtom;
    private _stateStream;
    private _componentMap;
    constructor(stateObject: StateObject);
    private inputForKey;
    private wrap;
    private subView;
    private render;
    update(chunk: any): void;
    onChange(key: string, cb: Function): void;
    get state(): StateObject;
    get stream(): Stream<StateObject>;
}

import "@potzblitz/rdom-components/dist/style.css";
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
    get state(): StateObject;
}

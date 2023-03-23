import { type Atom, defAtom } from "@thi.ng/atom";
import { start, renderOnce } from "@thi.ng/hdom";
import { fromAtom, trace, sync, reactive } from "@thi.ng/rstream";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { map } from "@thi.ng/transducers";
import { ComponentTree } from "./components";

class Potzblitz {
  private _mount: HTMLElement;
  private _state: Atom<any>;

  constructor(state: any) {
    this._state = defAtom(state);
    this._mount = document.createElement("div");
    this._mount.id = "mount";
    document.body.appendChild(this._mount);
    this.buildUi();
  }

  private buildUi() {
    const rootStyle = {
      "grid-template-columns": "repeat(2, 1fr) !important",
    };
    const changeFn = this._state.deref()["@change"] || null;
    this._state.addWatch("", () => {
      changeFn(this._state.deref());
    });
    const root = ({ state }) => {
      return ["div.ui-root", ComponentTree(state, "", rootStyle)];
    };
    start(root({ state: this._state }), { root: "mount" });
  }

  get state(): Atom<any> {
    return this._state;
  }

  get snapshot(): any {
    return this._state.deref();
  }

  public update(updateFn: Function): void {
    this._state.reset(updateFn(this._state.deref()));
  }
}

export { Potzblitz };

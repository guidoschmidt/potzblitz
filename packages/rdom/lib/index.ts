import "@potzblitz/styles/dist/index.css";
import "@potzblitz/rdom-components/dist/style.css";
import { Atom, History } from "@thi.ng/atom";
import type { Path } from "@thi.ng/api";
import { fromAtom, fromViewUnsafe, reactive, Stream } from "@thi.ng/rstream";
import { pluck, map } from "@thi.ng/transducers";
import { $list, $switch, $compile } from "@thi.ng/rdom";
import { div } from "@thi.ng/hiccup-html";
import {
  Slider,
  Button,
  StringInputField,
  NumberInputField,
  Select,
  ColorPicker,
  ColorSelector,
  Toggle,
} from "@potzblitz/rdom-components";
import { Annotation, StateObject } from "./api";

export class Potzblitz {
  private _stateAtom: History<Atom<StateObject>> = undefined;
  private _stateStream: Stream<any> = undefined;
  private _componentMap: Map<string, any> = undefined;

  constructor(stateObject: StateObject) {
    this._componentMap = new Map<string, any>();

    // @ function
    this._componentMap.set("function", async (k: Annotation) => {
      return this.wrap(
        k,
        "function",
        Button({
          label: k.key,
          onClick: k.getValue(),
        })
      );
    });

    // @ number
    this._componentMap.set("number", async (k: Annotation) => {
      return this.wrap(
        k,
        "number",
        NumberInputField({
          label: k.key,
          value: k.getValue(),
          onInput: (v: number) => k.setValue(v),
        })
      );
    });

    // @ boolean
    this._componentMap.set("boolean", async (k: Annotation) => {
      return this.wrap(
        k,
        "boolean",
        Toggle({
          label: k.key,
          value: k.getValue(),
          onClick: (v: boolean) => k.setValue(v),
        })
      );
    });

    // @ string
    this._componentMap.set("string", async (k: Annotation) => {
      return this.wrap(
        k,
        "string",
        StringInputField({
          label: k.key,
          value: k.getValue(),
          onInput: (v: string) => k.setValue(v),
        })
      );
    });

    // @ slider
    this._componentMap.set("slider", async (k: Annotation) => {
      return this.wrap(
        k,
        "slider",
        Slider({
          step: k.step,
          min: k.min,
          max: k.max,
          label: k.key,
          value: k.getValue(),
          onInput: (v: number) => k.setValue(v),
        })
      );
    });

    // @ colorpicker
    this._componentMap.set("colorpicker", async (k: Annotation) => {
      return this.wrap(
        k,
        "colorpicker",
        ColorPicker({
          label: k.key,
          value: k.getValue(),
          onSelect: (c: string) => k.setValue(c),
        })
      );
    });

    // @ colorselector
    this._componentMap.set("colorselector", async (k: Annotation) => {
      return this.wrap(
        k,
        "colorselector",
        ColorSelector({
          label: k.key,
          value: k.getValue(),
          onSelect: (c: string) => k.setValue(c),
        })
      );
    });

    // @ select
    this._componentMap.set("select", async (k: Annotation) => {
      return this.wrap(
        k,
        "select",
        Select({
          label: k.key,
          value: k.getValue(),
          options: k.options,
          onSelect: (v: number) => k.setValue(v),
        })
      );
    });

    this._stateAtom = new History(new Atom(stateObject));
    this._stateStream = fromAtom(this._stateAtom);
    this.render();
  }

  private inputForKey(keyPath: Path, v: any): void {
    // @ts-ignore
    this._stateAtom.resetIn(keyPath, v);
  }

  private wrap(k: Annotation, compType: string, com: any) {
    return [
      "div.component",
      {
        class: k
          .getIsHidden()
          .transform(
            map((x) =>
              x ? "component hidden" : `component ${compType} ${k.key}`
            )
          ),
      },
      com,
    ];
  }

  private mainGroupTitle() {
    return [
      div(
        {
          class: "group-title main",
          onclick: (e: PointerEvent) => {
            const target = e.target as HTMLDivElement;
            target?.parentElement.classList.toggle("hidden");
          },
        },
        "UI"
      ),
      div(
        { class: "history" },
        Button({
          label: "Undo",
          onClick: () => this._stateAtom.undo(),
        }),
        Button({
          label: "Redo",
          onClick: () => this._stateAtom.redo(),
        })
      ),
    ];
  }

  private groupTitle(path: string[], children = []) {
    return [
      div(
        {
          class: "group-title",
          onclick: (e: PointerEvent) => {
            const target = e.target as HTMLDivElement;
            target?.parentElement.classList.toggle("hidden");
          },
        },
        path.join("/"),
        children
      ),
    ];
  }

  // @TODO rename function
  private subView(
    groupTitle,
    subStream: Stream<StateObject>,
    path: string[] = []
  ) {
    const classRef = this;

    function resolveUiData(key: string): { mappedType: string } & Annotation {
      const nativeType = typeof subStream.transform(pluck(key)).deref();
      const annotations = subStream
        .transform(pluck(`@${key}`))
        .deref() as Annotation;
      const mappedType = annotations?.component ?? nativeType;
      // console.group(key);
      // console.log(mappedType);
      // console.log(annotations);
      // console.log();
      // console.groupEnd();
      const hideFn = annotations?.hide ? annotations.hide : () => false;
      const getValue = () => subStream.transform(pluck(key));
      const getIsHidden = () => subStream.transform(map((s) => hideFn?.(s)));
      const setValue = function (v: any) {
        classRef.inputForKey([...path, key], v);
      };
      return {
        mappedType,
        key,
        path,
        getValue,
        setValue,
        getIsHidden,
        ...annotations,
      };
    }

    return div(
      { class: "group" },
      ...groupTitle,
      $list(
        subStream.transform(
          map((s: any) =>
            Object.keys(s).filter((k: string) => !k.includes("@"))
          )
        ),
        "div.group-elements",
        {},
        (k: string) => {
          return $switch(
            reactive(k).transform(map((k: string) => resolveUiData(k))),
            (e: any) => e.mappedType,
            {
              ...Object.fromEntries(this._componentMap),
              // Ensure recursion
              object: async (k) => [
                "div.subgroup",
                {
                  class: k.key,
                },
                this.subView(
                  this.groupTitle([...path, k.key]),
                  fromViewUnsafe(this._stateAtom, { path: [...path, k.key] }),
                  [...path, k.key]
                ),
              ],
            }
          );
        }
      )
    );

    // [
    //   "div.group",
    //   {},
    //   [
    //     "div.group-title",
    //     {
    //     },
    //     path.join("/"),
    //   ],
    // ];
  }

  // @TODO add search
  // ["input.searchfield", { placeholder: "Search", oninput: $input(searchTerm) }],
  // ["h1", {}, searchTerm],
  private render() {
    $compile(
      div(
        { class: "ui-root" },
        this.subView(this.mainGroupTitle(), this._stateStream)
      )
    ).mount(document.body);
  }

  public update(chunk) {
    // this._stateAtom.resetInUnsafe("speed", Math.random() * 10);
    const update = { ...this.state, ...chunk };
    this._stateAtom.reset(update);
  }

  public onChange(key: string, cb: Function): void {
    this._stateAtom.addWatch(key, () => cb());
  }

  get state(): StateObject {
    return this._stateAtom.deref();
  }

  get stream(): Stream<StateObject> {
    return this._stateStream;
  }
}

import "@potzblitz/rdom-components/dist/style.css";
import { Atom } from "@thi.ng/atom";
import type { Path } from "@thi.ng/api";
import { fromAtom, fromViewUnsafe, reactive, Stream } from "@thi.ng/rstream";
import { pluck, map } from "@thi.ng/transducers";
import { $list, $switch, $compile } from "@thi.ng/rdom";
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
  private _stateAtom: Atom<StateObject> = undefined;
  private _stateStream: Stream<any> = undefined;
  private _componentMap: Map<string, any> = undefined;

  constructor(stateObject: StateObject) {
    this._componentMap = new Map<string, any>();

    // @ function
    this._componentMap.set("function", async (k: Annotation) => {
      return this.wrap(
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
        "select",
        Select({
          label: k.key,
          value: k.getValue(),
          options: k.options,
          onSelect: (v: number) => k.setValue(v),
        })
      );
    });

    this._stateAtom = new Atom(stateObject);
    this._stateStream = fromAtom(this._stateAtom);
    this.render();
  }

  private inputForKey(keyPath: Path, v: any): void {
    // @ts-ignore
    this._stateAtom.resetIn(keyPath, v);
  }

  private wrap(compType, com) {
    return [
      "div.component",
      {
        class: compType,
      },
      com,
    ];
  }

  // @TODO rename function
  private subView(subStream: Stream<StateObject>, path: string[] = []) {
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
      const getValue = () => subStream.transform(pluck(key));
      const setValue = function (v: any) {
        classRef.inputForKey([...path, key], v);
      };
      return { mappedType, key, path, getValue, setValue, ...annotations };
    }

    return [
      "div.group",
      {},
      [
        "div.group-title",
        {
          onclick: (e: PointerEvent) => {
            const target = e.target as HTMLDivElement;
            target?.parentElement.classList.toggle("hidden");
          },
        },
        path.length === 0 ? "UI" : path.join("/"),
      ],
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
                  // @TODO
                  // class: "hidden",
                },
                this.subView(
                  fromViewUnsafe(this._stateAtom, { path: [...path, k.key] }),
                  [...path, k.key]
                ),
              ],
            }
          );
        }
      ),
    ];
  }

  private render() {
    $compile([
      "div.ui-root",
      {},
      // @TODO add search
      // ["input.searchfield", { placeholder: "Search", oninput: $input(searchTerm) }],
      // ["h1", {}, searchTerm],
      this.subView(this._stateStream),
    ]).mount(document.body);
  }

  public update(chunk) {
    // this._stateAtom.resetInUnsafe("speed", Math.random() * 10);
    const update = { ...this.state, ...chunk };
    this._stateAtom.reset(update);
  }

  get state(): StateObject {
    return this._stateAtom.deref();
  }
}

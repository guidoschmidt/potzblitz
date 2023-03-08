import { type Atom, defView } from "@thi.ng/atom";
import { type StructureEntry } from "../api";
import {
  Slider,
  Button,
  ColorPicker,
  StringInputField,
  NumberInputField,
  Potentiometer,
  Select,
  Toggle,
} from "@potzblitz/components/src/hdom";

function ComponentTree(state: Atom<any>, keypath: string, style: object = {}) {
  const view = defView(state, keypath);

  function buildTree(state: Atom<any>, keypath: string): StructureEntry[] {
    const keys = Object.keys(view.deref()).map((key: string) => {
      const value = view.deref()[key];
      const _type = typeof view.deref()[key];
      const hexColorReg = /^#([0-9a-f]{3}){1,2}$/i;
      let componentType = view.deref()[`@${key}.component`];
      if (_type === "string" && hexColorReg.test(value)) {
        componentType = "color";
      }
      const layout = view.deref()[`@${key}.layout`];
      const step = view.deref()[`@${key}.step`] ?? 1;
      const min = view.deref()[`@${key}.min`] ?? 0;
      const max = view.deref()[`@${key}.max`] ?? 100;
      const subKeyPath = keypath.length > 0 ? `${keypath}.${key}` : key;
      return {
        _type,
        layout,
        step,
        min,
        max,
        componentType,
        path: subKeyPath,
        key,
      };
    });
    return keys;
  }

  const keys = buildTree(state, keypath);

  return () => {
    const structure = keys.map((e: StructureEntry) => {
      const subKeyPath = keypath.length > 0 ? `${keypath}.${e.key}` : e.key;
      const view = defView<e._type>(state, subKeyPath);
      return {
        ...e,
        view,
      };
    });

    return [
      "div.group",
      {
        style: style,
      },
      [
        [
          "label.group-label",
          {
            onclick: (e: PointerEvent) => {
              const target = e.target as HTMLDivElement;
              const group = target.parentElement;
              if (group.classList.contains("group")) {
                group.classList.toggle(
                  "collapsed",
                  !group.classList.contains("collapsed")
                );
              }
            },
          },
          keypath.length > 0 ? keypath : "UI",
        ],
        ...structure
          .filter((e) => e.key[0] !== "@")
          .map((e: StructureEntry) => {
            if (e.componentType !== undefined) {
              switch (e.componentType) {
                case "slider":
                  return Slider({
                    style: { "grid-column": e.layout },
                    label: e.key,
                    step: e.step,
                    min: e.min,
                    max: e.max,
                    value: e.view,
                    onUpdate: (v: number) => state.resetIn(e.path, v),
                  });

                case "potentiometer":
                  return Potentiometer({
                    style: { "grid-column": e.layout },
                    step: e.step,
                    min: e.min,
                    max: e.max,
                    label: e.key,
                    value: e.view,
                    id: e.key,
                    onUpdate: (v: number) => state.resetIn(e.path, v),
                  });

                case "color":
                  return ColorPicker({
                    style: { "grid-column": e.layout },
                    label: e.key,
                    value: e.view,
                    id: e.key,
                    onSelect: (v: string) => state.resetIn(e.path, v),
                  });

                case "select":
                  return Select({
                    style: { "grid-column": e.layout },
                    label: e.key,
                    value: e.view,
                    id: e.key,
                    options: state.deref()[`@${e.key}.options`] ?? [],
                    onSelect: (v: string) => state.resetIn(e.path, v),
                  });
              }
            }

            switch (e._type) {
              case "number":
                return NumberInputField({
                  style: { "grid-column": e.layout },
                  label: e.key,
                  step: e.step,
                  min: e.min,
                  max: e.max,
                  value: e.view,
                  onInput: (v: number) => state.resetIn(e.path, v),
                });

              case "string":
                return StringInputField({
                  style: { "grid-column": e.layout },
                  label: e.key,
                  value: e.view,
                  onInput: (v: string) => state.resetIn(e.path, v),
                });

              case "boolean":
                return Toggle({
                  style: { "grid-column": e.layout },
                  label: e.key,
                  value: e.view,
                  id: e.key,
                  onChange: (v) => state.resetIn(e.path, v),
                });

              case "function":
                return Button({
                  style: { "grid-column": e.layout },
                  label: e.key,
                  onClick: state.deref()[e.key],
                });

              case "object":
                const subKeyPath =
                  keypath.length > 0 ? `${keypath}.${e.key}` : e.key;
                const layout = view.deref()[`@${e.key}.layout`];
                const columnCount = view.deref()[`@${e.key}.columns`] ?? 2;
                const style = {
                  "grid-column": layout ? layout : `-1 / 1`,
                  "grid-template-columns": `repeat(${columnCount}, 1fr)`,
                };
                return ComponentTree(state, subKeyPath, style);
            }
          }),
      ],
    ];
  };
}

export { ComponentTree };

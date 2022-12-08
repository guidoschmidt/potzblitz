import h from "hyperscript";
import {
  createSignal,
  Button,
  ColorPicker,
  Potentiometer,
  RangeSlider,
  Slider,
  Select,
  InputField,
  Toggle,
} from "@potzblitz/components/src/hyperscript";

class UiRoot {
  private _rootContainer: HTMLDivElement;
  private _name: string;
  private _rootCtx: object;
  private _rootCtxO: Function;
  private _setRootCtxO: Function;
  private _mount: HTMLElement;

  constructor(mount?: HTMLElement) {
    this._mount = mount;
    return this;
  }

  save() {
    const data = JSON.stringify(this._rootCtx);
    localStorage.setItem(`potzblitz/${this._name}`, data);
  }

  restore() {
    const updateCtx = (root: object, newRoot: object) => {
      Object.keys(newRoot).forEach((key) => {
        const val = root[key];
        const newVal = newRoot[key];
        if (typeof val === "object") {
          updateCtx(val, newVal);
        } else {
          root[key] = newVal;
        }
      });
    };
    const restoredData = JSON.parse(
      localStorage.getItem(`potzblitz/${this._name}`)
    );
    if (restoredData !== null) {
      updateCtx(this._rootCtx, restoredData);
    }
  }

  hide(): void {
    this._rootContainer.classList.add("hidden");
  }

  show(): void {
    this._rootContainer.classList.remove("hidden");
  }

  clear() {
    this._rootContainer.innerHTML = "";
  }

  refresh() {
    this.clear();
    this.build(this._name, this._rootCtx, this._rootCtx["@change"]);
  }

  destroy() {
    this._mount.innerHTML = "";
  }

  build(
    name: string,
    obj: object,
    root?: HTMLDivElement,
    changed?: Function,
    collapsed = false
  ) {
    this._rootContainer =
      document.querySelector("div.potzblitz") ||
      h("div.potzblitz.ui-root.potzblitz-theme");
    if (this._mount) {
      this._mount.appendChild(this._rootContainer);
    } else {
      document.body.appendChild(this._rootContainer);
    }
    if (root === undefined) {
      this._name = name;
      this._rootCtx = obj;
      const [rootCtx, setRootCtx] = createSignal(this._rootCtx);
      this._rootCtxO = rootCtx;
      this._setRootCtxO = setRootCtx;
      this._rootCtxO(({ type, arrayName, arrayIdx, propertyName, v }) => {
        if (type === "array") {
          this._rootCtx[arrayName][arrayIdx][propertyName] = v;
        }
        this._rootCtx["@change"] && this._rootCtx["@change"]();
      });
    }
    const properties = Object.getOwnPropertyNames(obj);
    const [showGroup] = createSignal(!collapsed);
    const group = h(
      "div.ui-group",
      {
        className: `group ${showGroup() ? "visible" : ""}`,
      },
      h(
        "label.group-name",
        {
          onclick: (e: MouseEvent) => {
            const target = e.target as HTMLDivElement;
            const parent = target.parentNode as HTMLDivElement;
            parent.classList.toggle("visible");
          },
        },
        `${name}`
      )
    );
    (root || this._rootContainer).appendChild(group);
    const entries = h("div.entries");
    group.appendChild(entries);
    properties
      .filter((p) => p[0] !== "@")
      .forEach((property) => {
        const value = obj[property];
        const componentType = obj[`@${property}.component`];
        const min = obj[`@${property}.min`] || 0;
        const max = obj[`@${property}.max`] || 100;
        const step = obj[`@${property}.step`] || 1;
        const options = obj[`@${property}.options`] || [];
        changed = obj[`@change`] || changed;
        const t = Array.isArray(value)
          ? "array"
          : componentType || typeof value;
        switch (t) {
          case "array":
            let arr = value;
            let asObj = {};
            arr.forEach((item, i) => {
              Object.keys(item).forEach((key) => {
                const reg = /(@)?(\w+)(.\w)?/;
                const indexedKey = key.replace(reg, `$1${property}/$2${i}$3`);
                asObj[indexedKey] = item[key];
              });
            });
            this.build(property, asObj, entries, changed);
            break;
          case "object":
            this.build(property, value, entries, changed);
            break;
          case "function":
            this.addButton(entries, property, value, obj);
            break;
          case "string":
            this.addText(entries, property, value, obj);
            break;
          case "number":
            this.addNumber(entries, property, value, obj, step, changed);
            break;
          case "select":
            this.addSelect(entries, property, value, obj, options, changed);
            break;
          case "slider":
            this.addSlider(entries, property, value, obj, min, max, step);
            break;
          case "range":
            this.addRangeSlider(entries, property, value, obj, min, max, step);
            break;
          case "color":
            this.addColor(entries, property, value, obj);
            break;
          case "potentiometer":
            this.addPotentiometer(entries, property, value, obj, changed);
            break;
          case "boolean":
            this.addToggle(entries, property, value, obj);
            break;
        }
      });
    if (collapsed) this.hide();
    const updateFn = (cb) => {
      this._setRootCtxO(cb(this._rootCtx));
    };
    return updateFn;
  }

  addRangeSlider(
    group: HTMLElement,
    name: string,
    value: { low: number; high: number },
    ctx: object,
    min: number,
    max: number,
    step: number
  ) {
    group.appendChild(
      RangeSlider({
        name,
        value,
        ctx,
        onupdate: this._setRootCtxO,
        min,
        max,
        step,
      })
    );
  }

  addSelect(
    group: HTMLElement,
    label: string,
    value: number,
    ctx: object,
    options: Array<any>,
    onchange: Function
  ) {
    group.appendChild(
      Select(
        {
          label,
          value,
          options,
          onSelect: onchange || this._setRootCtxO,
        },
        ctx
      )
    );
  }

  addSlider(
    group: HTMLElement,
    label: string,
    value: number,
    ctx: object,
    min: number,
    max: number,
    step: number
  ) {
    group.appendChild(
      Slider(
        {
          label,
          value,
          min,
          max,
          step,
          onUpdate: this._setRootCtxO,
        },
        ctx
      )
    );
  }

  addButton(
    group: HTMLDivElement,
    label: string,
    onclick: () => any,
    ctx: object
  ) {
    group.appendChild(Button({ label, onClick: onclick }));
  }

  addToggle(group: HTMLDivElement, label: string, value: boolean, ctx: object) {
    group.appendChild(
      Toggle({ label, value, onChange: this._setRootCtxO }, ctx)
    );
  }

  addText(group: HTMLDivElement, label: string, value: string, ctx: object) {
    group.appendChild(
      InputField({ label, value, onChange: this._setRootCtxO }, ctx)
    );
  }

  addNumber(
    group: HTMLDivElement,
    label: string,
    value: number,
    ctx: object,
    step: number = 1,
    onchange: Function
  ) {
    group.appendChild(
      InputField(
        {
          label,
          step,
          value,
          onChange: onchange || this._setRootCtxO,
        },
        ctx
      )
    );
  }

  addColor(group: HTMLDivElement, label: string, value: string, ctx: object) {
    group.appendChild(
      ColorPicker({ label, value, onSelect: this._setRootCtxO }, ctx)
    );
  }

  addPotentiometer(
    group: HTMLDivElement,
    label: string,
    value: number,
    ctx: object,
    onchange: Function
  ) {
    group.appendChild(Potentiometer({ label, value, onUpdate: onchange }, ctx));
  }

  addImportExportUi() {
    const exportUi = h(
      "button.button.export",
      { onclick: this.downloadConfiguration.bind(this) },
      "Export"
    );
    const updateCtx = (root, newRoot) => {
      Object.keys(newRoot).forEach((key) => {
        const val = root[key];
        const newVal = newRoot[key];
        if (typeof val === "object") {
          updateCtx(val, newVal);
        } else {
          root[key] = newVal;
        }
      });
    };
    const onchange = (e) => {
      const { files } = e.target;
      const lastFile = files[files.length - 1];
      const fr = new FileReader(lastFile);
      fr.onloadend = () => {
        const imported = JSON.parse(fr.result);
        console.group("[IMPORT]");
        console.log("--- Previous:");
        console.log(this._rootCtx);
        updateCtx(this._rootCtx, imported);
        this.clear();
        this.build(this._name, this._rootCtx);
        console.log("--- Imported:");
        console.log(this._rootCtx);
        console.groupEnd();
      };
      fr.readAsText(lastFile);
    };
    const importUi = h("div.import", [
      h(
        "label.button",
        { htmlFor: "import" },
        "Import",
        h(`input#import`, { type: "file", onchange, accept: ".json" })
      ),
    ]);
    const ui = h("div.import-export", [importUi, exportUi]);
    this._rootContainer.appendChild(ui);
  }

  downloadConfiguration(name: string) {
    const link = document.createElement("a");
    if (name) {
      link.setAttribute("download", `${name}.json`);
    } else {
      link.setAttribute("download", `${Date.now()}.json`);
    }
    const data = JSON.stringify(this._rootCtx);
    const dataStr = encodeURIComponent(data);
    link.setAttribute("href", `data:text/json;charset=utf-8,${dataStr}`);
    link.click();
  }

  static downloadCanvas(querySelector?: string) {
    const canvas = document.querySelector(
      querySelector ? querySelector : "canvas"
    ) as HTMLCanvasElement;
    const link = document.createElement("a");
    link.setAttribute("download", `${Date.now()}`);
    link.setAttribute(
      "href",
      canvas?.toDataURL("image/png")?.replace("image/png", "image/octet-stream")
    );
    link.click();
  }
}

export { UiRoot };

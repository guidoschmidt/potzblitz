import { defView } from "@thi.ng/atom";

export function ViewState(state: Atom<any>, keypath: string) {
  const resolve = (valueType: string, subKeyPath: string, value: any) => {
    switch (valueType) {
      case "object":
        if (Array.isArray(state.deref())) {
          // return state.deref().map((v, i) => {
          //   return ViewState(v, subKeyPath + `.${i}`);
          // });
          // return subKeyPath;
          return;
        }
        return ViewState(state, subKeyPath);

      case "function":
        return ["button", { onclick: value }, "BUTTON"];

      case "number":
      case "string":
        return value;

      case "boolean":
        return value ? "true" : "false";
    }
  };

  return () => {
    const view = defView(state, keypath);
    const keys = Object.keys(view.deref());

    return [
      "div.view-state",
      ...keys
        .filter((key) => key[0] !== "@")
        .map((key: string) => {
          const value = view.deref()[key];
          const valueType = typeof value;
          const subKeyPath = keypath.length > 0 ? `${keypath}.${key}` : key;
          return [
            "div.row",
            ["span", key],
            ["span", resolve(valueType, subKeyPath, value)],
          ];
        }),
    ];
  };
}

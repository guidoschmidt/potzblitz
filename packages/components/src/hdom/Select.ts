import "../scss/Select.scss";
import { camelCaseWithSpaces, SelectProps, uniqueName } from "../api";
import { type View } from "@thi.ng/atom";

interface hdomSelectProps<T> extends SelectProps<T> {
  value: View<T>;
  id: string;
  style: object;
}

function Select<T>(props: hdomSelectProps<T>) {
  return () => {
    const toggleOptions = (e: PointerEvent) => {
      const target = e.target as HTMLDivElement;
      if (target === null) return;
      const options = target!.parentElement?.querySelector(
        ".options"
      ) as HTMLDivElement;
      if (options === null) return;
      if (options.classList.contains("hidden")) {
        options.classList.remove("hidden");
      } else {
        options.classList.add("hidden");
      }
    };

    const hideOptions = (optionsEl: HTMLDivElement) => {
      optionsEl.classList.add("hidden");
    };

    const handleSelect = (e: PointerEvent, o: T, idx: number) => {
      props.onSelect && props.onSelect(o, idx);
      const target = e.target as HTMLDivElement;
      if (target !== null) {
        hideOptions(target.parentElement);
      }
    };

    return [
      "div.select",
      { style: { ...props.style } },
      [props.label && ["label", camelCaseWithSpaces(props.label)]],
      ["div.selected", { onclick: toggleOptions }, props.value.deref()],
      [
        `div.options.hidden`,
        props.options &&
          props.options.map((o: T, i: number) => [
            "div.option",
            { onclick: (e: PointerEvent) => handleSelect(e, o, i) },
            o,
          ]),
      ],
    ];
  };
}

export { Select };

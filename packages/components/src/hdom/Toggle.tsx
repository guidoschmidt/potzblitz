import "../scss/Toggle.scss";
import { camelCaseWithSpaces, ToggleProps } from "../api";
import { type View } from "@thi.ng/atom";

interface hdomToggleProps extends ToggleProps {
  id: string;
  value: View<boolean>;
}

function Toggle(props: hdomToggleProps) {
  return () => {
    const handleClick = () => {
      props.onChange && props.onChange(!props.value.deref());
    };

    return [
      "div.toggle",
      props.label && ["label", {}, camelCaseWithSpaces(props.label)],
      [
        "div.input-wrapper",
        { onclick: handleClick },
        [
          `div.state.${props.value.deref() ? "on" : "off"}`,
          {
            id: props.id,
          },
          [
            `input#${props.id}`,
            { type: "checkbox", value: props.value.deref() },
          ],
        ],
      ],
    ];
  };
}

export { Toggle };

// .state.${props.value.deref() ? "on" : "off"}#${props.id}

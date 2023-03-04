import "../scss/Potentiometer.scss";
import { camelCaseWithSpaces, PotentiometerProps } from "../api";
import { ValueView } from "./blocks";
import { type View } from "@thi.ng/atom";

interface hdomPotentiometerProps extends PotentiometerProps {
  value: View<number>;
  id: string;
}

function Potentiometer(props: hdomPotentiometerProps) {
  return () => {
    const handlePointerDown = (_: PointerEvent) => {
      const target = document.querySelector(`#${props.id}`);
      target && target.classList.add("dragging");
    };

    const handlePointerMove = (e: PointerEvent) => {
      const target = document.querySelector(`#${props.id}`);
      if (target && !target.classList.contains("dragging")) return;
      if (target === null) return;
      const { width, height, x, y } = target.getBoundingClientRect();
      const xRel = width * 0.5 - (e.clientX - x);
      const yRel = height * 0.5 - (e.clientY - y);
      const vec = [-xRel, yRel];
      const length = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1]);
      if (length < 5.0) return;
      const angle =
        Math.round((Math.atan2(vec[0], vec[1]) + Math.PI) * (180 / Math.PI)) /
        360;
      props.onUpdate && props.onUpdate(angle);
    };

    const handlePointerUp = (_: PointerEvent) => {
      const target = document.querySelector(`#${props.id}`);
      target && target.classList.remove("dragging");
    };

    return [
      "div.potentiometer",
      props.label && ["label", camelCaseWithSpaces(props.label)],
      [
        `div#${props.id}.knob-wrapper`,
        {
          onpointerdown: handlePointerDown,
          onpointermove: handlePointerMove,
          onpointerup: handlePointerUp,
        },
        [
          "div.knob",
          {
            style: {
              transform: `rotate(${props.value.deref() * 360}deg)`,
            },
          },
          ["div.angle-indicator"],
        ],
      ],
      ValueView(props.value.deref()),
    ];
  };
}

export { Potentiometer };

import { useState, useEffect } from "react";
import { handleSliderInput } from "../../api/Slider";
import { camelCaseWithSpaces } from "../../utils";
import "scss.ui.toolkit/6-components/_slider.scss";

type SliderProps = {
  value: number;
  name: string;
  min: number;
  max: number;
  step: number;
  ctx: object;
  onupdate: ({ ctx, name, v }) => any;
};

export function Slider({ value, name, onupdate, ctx }: SliderProps) {
  const [vO, setVO] = useState(value);

  useEffect(() => {
    onupdate && onupdate(vO);
  }, [vO]);

  return (
    <div className="ui-container slider">
      <label>{camelCaseWithSpaces(name)}</label>
      <input
        type="range"
        onInput={(e) => handleSliderInput(e, setVO)}
        value={vO}
      />
      <span className="text-value">{vO}</span>
    </div>
  );
}

export function Slider(props: any) {
  const handleInput = (e: InputEvent): number => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const newValue = parseFloat(value);
    return newValue;
  };

  return (
    <div classList={{ slider: true }}>
      {props.label && <label>{props.label}</label>}
      {/*      <input
           type="range"
           value={props.value}
           min={props.min}
           max={props.max}
           step={props.step}
           onInput={(e: InputEvent) =>
             props.onUpdate && props.onUpdate(handleInput(e))
                   }
           onPointerUp={(e: InputEvent) =>
             props.onBlur && props.onBlur(handleInput(e))
                       }
      />
       */}
      <button onClick={() => props.onUpdate(props.value + 1)}>
        {props.value}
      </button>
    </div>
  );
}

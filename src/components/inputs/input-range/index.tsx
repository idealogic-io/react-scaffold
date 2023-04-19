import React, { ChangeEvent, useEffect, useRef, useState } from "react";
// Styling
import { StyledRangeInput } from "./styled";
// Types
import { InputRangeProps } from "./types";

export const InputRange: React.FC<InputRangeProps> = ({
  name = "range",
  value,
  min = 0,
  max = 100,
  disabled,
  onValueChanged,
}) => {
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onValueChanged(parseFloat(target.value));
  };

  // handle after thumb grey line width
  const ref = useRef<HTMLInputElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (ref.current?.clientWidth) setWidth(ref.current.clientWidth);
  }, [ref.current?.clientWidth]);

  return (
    <>
      <StyledRangeInput
        type="range"
        name={name}
        value={value}
        min={min}
        max={max}
        afterThumbWidth={width}
        onChange={handleChange}
        disabled={disabled}
        ref={ref}
      />
    </>
  );
};

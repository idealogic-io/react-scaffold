import React, { ChangeEvent, MouseEvent, useState } from "react";
// Styling
import { StyledRangeInput } from "./styled";
// Types
import { InputProps } from "./types";

export const InputRange: React.FC<InputProps> = ({
  name = "range",
  value = 0,
  min = 0,
  max = 100,
  disabled,
  onValueChanged,
  onFinishDrag,
}) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInternalValue(parseFloat(value));
    onValueChanged?.(parseFloat(value));
  };

  const handleMouseUp = (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = (event.target as HTMLInputElement).value;

    onFinishDrag?.(parseFloat(value));
  };

  return (
    <StyledRangeInput
      type="range"
      name={name}
      value={internalValue}
      min={min}
      max={max}
      onChange={handleChange}
      onMouseUp={handleMouseUp}
      disabled={disabled}
    />
  );
};

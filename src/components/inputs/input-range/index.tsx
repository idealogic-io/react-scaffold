import React, { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
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
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [width, setWidth] = useState(0);

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current?.clientWidth) {
      setWidth(ref.current.clientWidth);
    }
  }, [ref.current?.clientWidth]);

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
      {...props}
      type="range"
      name={name}
      value={internalValue}
      min={min}
      max={max}
      afterThumbWidth={width}
      onChange={handleChange}
      onMouseUp={handleMouseUp}
      disabled={disabled}
      ref={ref}
    />
  );
};

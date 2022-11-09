import React from "react";
import { Input } from "components";
import { REGEX } from "configs";
import { InputNumericProps } from "./types";

const InputNumeric: React.FC<InputNumericProps> = ({ onUserInput, value, placeholder, ...props }) => {
  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/,/g, ".");

    if (REGEX.numericInputRegex.test(value)) {
      onUserInput(value);
    }
  };

  return (
    <Input
      value={value}
      placeholder={placeholder}
      inputMode="decimal"
      pattern="^[0-9]*[.,]?[0-9]*$"
      onChange={event => onChangeText(event)}
      {...props}
    />
  );
};

export default InputNumeric;

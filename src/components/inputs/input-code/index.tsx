import React, { useEffect, useRef } from "react";
// Components
import { StyledInput } from "./styled";
import Cells from "./cells";
// Types
import { InputProps } from "../input/types";
import { InputCodeProps } from "./types";

import { REGEX } from "configs";

const DEFAULT_CELL_COUNT = 4;

export const InputCode = <E extends React.ElementType = "input">({
  cellCount = DEFAULT_CELL_COUNT,
  value,
  isFocused,
  isError,
  autoFocus = true,
  onUserInput,
  cellHeight,
  cellWidth,
  ...props
}: InputProps<E> & InputCodeProps): JSX.Element => {
  const textInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value.length === cellCount) {
      textInputRef.current?.blur();
    }
  }, [value]);

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (REGEX.onlyNumbers.test(value)) {
      onUserInput(value);
    }
  };

  return (
    <div>
      <div>
        <Cells
          cellCount={cellCount}
          value={value}
          isFocused={isFocused}
          isError={isError}
          cellWidth={cellWidth}
          cellHeight={cellHeight}
        />

        <StyledInput
          autoFocus={autoFocus}
          ref={textInputRef}
          inputMode="numeric"
          pattern="^[0-9]*$"
          maxLength={cellCount}
          value={value}
          onChange={event => onChangeText(event)}
          {...props}
        />
      </div>
    </div>
  );
};

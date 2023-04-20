import React from "react";
// Components
import { Text } from "components";
import { StyledNumericInput, StyledInputContainer } from "./styled";
import { Cursor } from "./Cursor";
// Types
import { CellsProps } from "./types";

const Cells: React.FC<CellsProps> = ({ cellCount, value, isFocused, isError, width = 44, heigh = 44 }) => {
  return (
    <StyledInputContainer>
      {Array.from({ length: cellCount }).map((_, i) => {
        const textValue = value[i] ?? "";
        const isFocusedValue = i === value.length && isFocused;
        const isLastNFocus = i === cellCount - 1 && isFocused;

        return (
          <StyledNumericInput
            key={i}
            value={textValue}
            isFocusedValue={isFocusedValue}
            isError={isError}
            width={width}
            heigh={heigh}
          >
            {isFocusedValue || (isLastNFocus && !!textValue) ? (
              <Cursor delay={500} isLastNFocus={isLastNFocus} value={textValue} />
            ) : (
              <Text textScale="body1">{textValue}</Text>
            )}
          </StyledNumericInput>
        );
      })}
    </StyledInputContainer>
  );
};

export default Cells;

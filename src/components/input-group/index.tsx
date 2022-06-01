import React, { cloneElement } from "react";

import { InputIcon, StyledInputGroup } from "./StyledInputGroup";

import { InputGroupProps } from "./types";
import { scales as inputScales } from "components/input/types";

const InputGroup: React.FC<InputGroupProps> = ({ scale = inputScales.MD, startIcon, endIcon, children, ...props }) => (
  <StyledInputGroup
    scale={scale}
    width="100%"
    position="relative"
    hasStartIcon={!!startIcon}
    hasEndIcon={!!endIcon}
    {...props}
  >
    {startIcon && <InputIcon scale={scale}>{startIcon}</InputIcon>}
    {cloneElement(children, { scale })}
    {endIcon && (
      <InputIcon scale={scale} isEndIcon>
        {endIcon}
      </InputIcon>
    )}
  </StyledInputGroup>
);

export default InputGroup;

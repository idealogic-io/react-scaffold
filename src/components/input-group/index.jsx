import React, { cloneElement } from "react";

import { inputScales } from "components";
import { InputIcon, StyledInputGroup } from "./styles";

const InputGroup = ({ scale = inputScales.MD, startIcon, endIcon, children, ...props }) => (
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

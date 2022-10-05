import React, { cloneElement } from "react";

import { InputError, InputIcon, InputLabel, InputGroupWrapper } from "./StyledInputGroup";

import { InputGroupProps } from "./types";
import { scales as inputScales } from "components/input/types";
import { Box } from "components/layout";

const InputGroup: React.FC<InputGroupProps> = ({
  scale = inputScales.MD,
  startIcon,
  endIcon,
  children,
  error,
  label,
  isTouched,
  ...props
}) => (
  <Box>
    <InputGroupWrapper scale={scale} hasStartIcon={!!startIcon} hasEndIcon={!!endIcon} {...props}>
      {label && <InputLabel>{label}</InputLabel>}

      <Box position="relative">
        {startIcon && <InputIcon scale={scale}>{startIcon}</InputIcon>}

        {cloneElement(children, { scale })}

        {endIcon && (
          <InputIcon scale={scale} isEndIcon>
            {endIcon}
          </InputIcon>
        )}
      </Box>
    </InputGroupWrapper>

    {error && isTouched && <InputError>{error}</InputError>}
  </Box>
);

export default InputGroup;

import React, { cloneElement } from "react";

import { InputError, InputIcon, InputLabel, InputWrapper } from "./StyledInputGroup";

import { InputGroupProps } from "./types";
import { scales as inputScales } from "components/input/types";
import { Box } from "components";

const InputGroup: React.FC<InputGroupProps> = ({
  scale = inputScales.MD,
  startIcon,
  endIcon,
  children,
  error,
  label,
  isTouched,
  disabled,
  ...props
}) => {
  const startIconWidth = startIcon?.props?.width ? parseInt(startIcon?.props?.width) : 20;
  const iconWidth = startIcon ? startIconWidth : 0;
  return (
    <Box {...props}>
      <InputWrapper
        hasStartIcon={!!startIcon}
        hasEndIcon={!!endIcon}
        disabled={disabled}
        isError={!!error && isTouched}
      >
        {startIcon && <InputIcon scale={scale}>{startIcon}</InputIcon>}

        <Box position="relative" width="100%">
          {label && <InputLabel hasStartIcon={!!startIcon}>{label}</InputLabel>}

          {cloneElement(children, { scale, disabled })}
        </Box>

        {endIcon && <InputIcon scale={scale}>{endIcon}</InputIcon>}
      </InputWrapper>

      {error && isTouched && (
        <InputError iconWidth={iconWidth} scale={scale} disabled={disabled}>
          {error}
        </InputError>
      )}
    </Box>
  );
};

export default InputGroup;

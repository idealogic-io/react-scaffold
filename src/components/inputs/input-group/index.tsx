import React, { cloneElement } from "react";

import { InputError, InputIcon, StyledInputGroup } from "./styled";

import { InputGroupProps } from "./types";
import { scales as inputScales } from "components/inputs/input/types";
import { Box, Text } from "components";

export const InputGroup: React.FC<InputGroupProps> = ({
  scale = inputScales.MD,
  startIcon,
  endIcon,
  children,
  error,
  label,
  isTouched,
  isShowError = true,
  ...props
}) => (
  <StyledInputGroup scale={scale} width="100%" hasStartIcon={!!startIcon} hasEndIcon={!!endIcon} {...props}>
    {label && (
      <Text textScale="caption1" color="monochrome600" mb="8px">
        {label}
      </Text>
    )}

    <Box position="relative">
      {startIcon && <InputIcon scale={scale}>{startIcon}</InputIcon>}

      {cloneElement(children, { scale, error, isTouched })}

      {endIcon && (
        <InputIcon scale={scale} isEndIcon>
          {endIcon}
        </InputIcon>
      )}
    </Box>

    {isShowError && <InputError textScale="caption2">{error && isTouched ? error : " "}</InputError>}
  </StyledInputGroup>
);

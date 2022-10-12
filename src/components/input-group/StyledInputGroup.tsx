import styled from "styled-components";

import { Text, Flex, Svg } from "components";

import { InputIconProps, StyledInputGroupProps, InputErrorProps } from "./types";
import { Scales, scales as inputScales } from "components/input/types";

const getPadding = (scale: Scales) => {
  switch (scale) {
    case inputScales.SM:
      return 8;
    case inputScales.MD:
      return 10;
    case inputScales.LG:
      return 12;
  }
};

export const InputLabel = styled(Text)<{ hasStartIcon: boolean }>`
  font-size: 12px;
  margin-top: 6px;
  line-height: 16px;
  margin-left: ${({ hasStartIcon }) => (hasStartIcon ? 0 : 12)}px;
  color: ${({ theme }) => theme.colors.monochrome600};
`;

export const InputIcon = styled.div<InputIconProps>`
  align-items: center;
  justify-content: center;
  display: flex;
  padding: ${({ scale }) => getPadding(scale)}px;
`;

export const InputError = styled(Text)<InputErrorProps>`
  font-size: 12px;
  margin-top: 4px;
  color: ${({ theme, disabled }) => (disabled ? theme.colors.monochrome400 : theme.colors.error500)};
  margin-left: ${({ scale, iconWidth }) => (iconWidth ? getPadding(scale) * 2 + iconWidth : 12)}px;
`;

export const InputWrapper = styled(Flex)<StyledInputGroupProps>`
  background-color: ${({ theme, isError }) => (isError ? theme.colors.error50 : theme.colors.monochrome25)};
  border-top-left-radius: ${({ theme }) => theme.radii.semiMedium};
  border-top-right-radius: ${({ theme }) => theme.radii.semiMedium};
  border-bottom: 1px solid ${({ theme }) => theme.colors.monochrome300};

  input {
    padding-left: ${({ hasStartIcon }) => hasStartIcon && 0};
    padding-right: ${({ hasEndIcon }) => hasEndIcon && 0};
    background-color: inherit;
  }

  ${Svg} {
    fill: ${({ theme }) => theme.colors.monochrome400};
  }

  &:hover {
    background-color: ${({ theme, disabled }) => !disabled && theme.colors.monochrome50};
  }

  &:focus-within {
    border-bottom: 1px solid ${({ theme }) => theme.colors.accent500};

    ${InputLabel} {
      color: ${({ theme }) => theme.colors.accent500};
    }
  }

  ${({ disabled, theme }) =>
    disabled &&
    `
    background-color: ${theme.colors.monochrome300};
    color: ${theme.colors.monochrome400};
    cursor: not-allowed;
    ${InputLabel} {
      color: ${theme.colors.monochrome400};
    }
    `}
`;

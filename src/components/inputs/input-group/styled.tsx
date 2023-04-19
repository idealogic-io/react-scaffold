import styled from "styled-components";
import { layout, space } from "styled-system";

import { Box, Text } from "components";

import { InputIconProps, StyledInputGroupProps } from "./types";
import { Scales, scales as inputScales } from "components/inputs/input/types";

const getPadding = (scale: Scales, hasIcon: boolean) => {
  if (!hasIcon) {
    return "16px";
  }

  switch (scale) {
    case inputScales.SM:
      return "32px";
    case inputScales.LG:
      return "56px";
    case inputScales.MD:
      return "48px";
  }
};

export const StyledInputGroup = styled(Box)<StyledInputGroupProps>`
  input {
    padding-left: ${({ hasStartIcon, scale }) => getPadding(scale, hasStartIcon)};
    padding-right: ${({ hasEndIcon, scale }) => getPadding(scale, hasEndIcon)};
  }
  ${layout}
  ${space}
`;

export const InputIcon = styled.div<InputIconProps>`
  align-items: center;
  display: flex;
  height: 100%;
  position: absolute;
  top: 0;

  ${({ isEndIcon, scale }) =>
    isEndIcon
      ? `
      right: ${scale === inputScales.SM ? "8px" : "16px"};
    `
      : `
      left: ${scale === inputScales.SM ? "8px" : "16px"};
    `}
`;

export const InputError = styled(Text)`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.error400};
  white-space: pre-wrap;
`;

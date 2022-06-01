import styled from "styled-components";

import { Box, Input } from "components";

import { InputIconProps, StyledInputGroupProps } from "./types";
import { Scales, scales as inputScales } from "components/input/types";

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
    default:
      return "48px";
  }
};

export const StyledInputGroup = styled(Box)<StyledInputGroupProps>`
  ${Input} {
    padding-left: ${({ hasStartIcon, scale }) => getPadding(scale, hasStartIcon)};
    padding-right: ${({ hasEndIcon, scale }) => getPadding(scale, hasEndIcon)};
  }
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

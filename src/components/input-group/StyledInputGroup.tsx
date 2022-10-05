import styled from "styled-components";

import { Box, Text } from "components";

import { InputIconProps, StyledInputGroupProps } from "./types";
import { Scales, scales as inputScales } from "components/input/types";

const getPadding = (scale: Scales, hasIcon: boolean) => {
  if (!hasIcon) {
    return "12px";
  }

  switch (scale) {
    // icon width + getPosition()*2
    case inputScales.SM:
      return "40px";
    case inputScales.MD:
      return "48px";
    case inputScales.LG:
      return "56px";
  }
};

const getPosition = (scale: Scales) => {
  switch (scale) {
    case inputScales.SM:
      return "8px";
    case inputScales.MD:
      return "12px";
    case inputScales.LG:
      return "16px";
  }
};

export const InputGroupWrapper = styled(Box)<StyledInputGroupProps>`
  background-color: ${({ theme }) => theme.colors.monochrome25};
  border-top-left-radius: ${({ theme }) => theme.radii.semiMedium};
  border-top-right-radius: ${({ theme }) => theme.radii.semiMedium};
  border-bottom: 1px solid ${({ theme }) => theme.colors.monochrome300};

  input {
    padding-left: ${({ hasStartIcon, scale }) => getPadding(scale, hasStartIcon)};
    padding-right: ${({ hasEndIcon, scale }) => getPadding(scale, hasEndIcon)};
  }
`;

export const InputIcon = styled.div<InputIconProps>`
  align-items: center;
  display: flex;
  height: 100%;
  width: 24px;
  position: absolute;
  top: 0;
  margin-right: ${({ scale }) => getPosition(scale)};

  ${({ isEndIcon, scale }) => (isEndIcon ? `right: ${getPosition(scale)};` : `left: ${getPosition(scale)};`)};
`;

export const InputLabel = styled(Text)`
  font-size: 14px;
  margin-bottom: 8px;
`;

export const InputError = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.error500};
`;

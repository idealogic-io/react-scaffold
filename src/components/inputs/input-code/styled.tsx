import styled, { css, keyframes } from "styled-components";

import { Flex } from "components";
import { Input } from "../input";
import { StyledNumericInputProps } from "./types";

const shake = keyframes`
  0% {
    transform: translateX(-12px);
  }
  20% {
    transform: translateX(12px);
  }
  40% {
    transform: translateX(-12px);
  }
  60% {
    transform: translateX(12px);
  }
  80% {
    transform: translateX(-12px);
  }
  100% {
    transform: translateX(0);
  }
`;

const shakeAnimation = css`
  animation: ${shake} 0.4s linear;
`;

export const StyledInputContainer = styled(Flex)`
  justify-content: space-between;
  flex-direction: row;
`;

export const StyledInput = styled(Input)`
  padding: 0 !important;
  position: absolute;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
`;

export const StyledNumericInput = styled(Flex)<StyledNumericInputProps>`
  width: ${({ width }) => width + "px"};
  height: ${({ heigh }) => heigh + "px"};
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.semiMedium};
  border: 1px solid
    ${({ theme, value, isFocusedValue, isError }) =>
      isError
        ? theme.colors.error400
        : !!value || isFocusedValue
        ? theme.colors.monochrome500
        : theme.colors.transparent};
  background-color: ${({ theme, isError }) => (isError ? theme.colors.error100 : theme.colors.transparent)};
  transition: 0.3s all linear;
  ${({ isError }) => isError && shakeAnimation}
`;

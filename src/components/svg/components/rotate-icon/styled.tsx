import styled, { css, keyframes } from "styled-components";
import { Box } from "components/layout";
import { StyledRotateIconProps, Variant } from "./types";

const rotate = (variant: Variant) => keyframes`
  from { transform: ${variant}(90deg) }
  to { transform: ${variant}(0deg) }
`;

const rotateReverse = (variant: Variant) => keyframes`
  from { transform: ${variant}(-90deg) }
  to { transform: ${variant}(0deg) }
`;

const animationRotate = (variant: Variant) => css`
  animation: ${rotate(variant)} 0.3s ease-in-out;
`;

const animationRotateReverse = (variant: Variant) => css`
  animation: ${rotateReverse(variant)} 0.3s ease-in-out;
`;

export const StyledRotate = styled(Box)<StyledRotateIconProps>`
  ${({ isToggled, variant }) => (isToggled ? animationRotate(variant) : animationRotateReverse(variant))};
`;

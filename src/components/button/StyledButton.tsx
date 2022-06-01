import styled from "styled-components";
import { space, typography, layout, opacity, border, shadow, variant } from "styled-system";

import { getTextColor } from "components/text";
import { ButtonProps, ThemedProps } from "./types";
import { scaleVariants, styleVariants } from "./theme";

const getDisabledStyles = ({ isLoading, theme }: ThemedProps) => {
  if (isLoading) {
    return `
      &:disabled {
        cursor: not-allowed;
      }
    `;
  }

  return `
    &:disabled {
      background-color: ${theme.colors.backgroundDisabled};
      border-color: ${theme.colors.backgroundDisabled};
      box-shadow: none;
      color: ${theme.colors.secondary};
      cursor: not-allowed;
    }
  `;
};

const StyledButton = styled.button<ButtonProps>`
  position: relative;
  align-items: center;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.medium};
  box-shadow: ${({ theme }) => theme.shadows.button};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  justify-content: center;
  line-height: 1;
  outline: 0;
  font-size: 16px;
  font-weight: 600;
  color: ${getTextColor};
  ${getDisabledStyles};
  ${variant({
    prop: "scale",
    variants: scaleVariants,
  })}
  ${variant({
    variants: styleVariants,
  })}
  ${space}
  ${typography}
  ${layout}
  ${opacity}
  ${border}
  ${shadow}
  transition: all .2s ease-in-out;
  &:hover {
    transform: ${({ disabled }) => !disabled && `scale(0.95)`};
  }
  &:active {
    transform: ${({ disabled }) => !disabled && `scale(0.9)`};
  }
`;

export default StyledButton;

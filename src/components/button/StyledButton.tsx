import styled from "styled-components";
import { space, typography, layout, opacity, border, shadow, variant } from "styled-system";
import { scaleVariants, variantStyles } from "./theme";

import { ButtonProps } from "./types";

const StyledButton = styled.button<ButtonProps>`
  position: relative;
  align-items: center;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.medium};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  justify-content: center;
  line-height: 1;
  outline: 0;
  font-size: 16px;
  font-weight: 600;
  ${variant({
    prop: "scale",
    variants: scaleVariants,
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
  &:disabled {
    background-color: ${({ theme }) => theme.colors.monochrome400};
    border-color: ${({ theme }) => theme.colors.monochrome400};
    box-shadow: none;
    color: ${({ theme }) => theme.colors.monochrome400};
    cursor: not-allowed;
  }

  ${({ theme, variant }) => variantStyles(theme, variant)};
`;

export default StyledButton;

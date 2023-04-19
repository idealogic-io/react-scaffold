import styled from "styled-components";
import { space, typography, layout, opacity, border, shadow, variant } from "styled-system";
import { scaleVariants, variantStyles } from "./theme";

import { ButtonProps } from "./types";

const StyledButton = styled.button<ButtonProps>`
  border-radius: ${({ theme }) => theme.radii.semiMedium};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => (theme.isDark ? theme.colors.monochrome900 : theme.colors.monochrome0)};

  position: relative;
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  justify-content: center;
  line-height: 1.375;
  outline: 0;
  font-size: 14px;
  transition: all 0.2s linear;
  width: fit-content;
  border: 0;

  ${variant({
    prop: "scale",
    variants: scaleVariants,
  })};

  ${({ theme, variant, color, hoverColor }) => variantStyles(theme, variant, color, hoverColor)};

  ${space}
  ${typography}
  ${layout}
  ${opacity}
  ${border}
  ${shadow}
`;

export default StyledButton;

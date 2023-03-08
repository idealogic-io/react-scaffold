import { Svg } from "components/svg";
import styled from "styled-components";
import { space, typography, layout, opacity, border, shadow, variant } from "styled-system";
import { scaleVariants, variantStyles } from "./theme";

import { ButtonProps } from "./types";

const StyledButton = styled.button<ButtonProps>`
  border-radius: ${({ theme }) => theme.radii.semiMedium};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.monochrome0)};

  position: relative;
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  justify-content: center;
  outline: 0;
  border: 0;
  line-height: 1.375;
  transition: all 0.2s linear;
  width: fit-content;

  ${variant({
    prop: "scale",
    variants: scaleVariants,
  })}

  ${Svg} {
    fill: ${({ theme }) => theme.colors.monochrome0};
  }

  ${({ theme, variant, color }) => variantStyles(theme, variant, color)};

  ${space}
  ${typography}
  ${layout}
  ${opacity}
  ${border}
  ${shadow}
`;

export default StyledButton;

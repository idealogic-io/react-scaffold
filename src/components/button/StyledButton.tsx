import { Svg } from "components/svg";
import styled from "styled-components";
import { space, typography, layout, opacity, border, shadow, variant } from "styled-system";
import { HSL } from "theme/types";
import { scaleVariants, variantStyles } from "./theme";

import { ButtonProps } from "./types";

const StyledButton = styled.button<ButtonProps>`
  border-radius: ${({ theme }) => theme.radii.semiMedium};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.monochrome0};

  position: relative;
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  justify-content: center;
  line-height: 1;
  outline: 0;
  font-size: 16px;
  border: 2px solid;
  transition: all 0.2s ease-in-out;
  width: fit-content;

  ${space}
  ${typography}
  ${layout}
  ${opacity}
  ${border}
  ${shadow}

  ${variant({
    prop: "scale",
    variants: scaleVariants,
  })}

  &:disabled {
    background-color: ${({ theme }) => theme.colors.monochrome400};
    border-color: ${({ theme }) => theme.colors.monochrome400};
    cursor: not-allowed;
  }

  ${Svg} {
    transition: all 0.2s ease-in-out;
    fill: ${({ theme }) => theme.colors.monochrome0};
  }

  ${({ theme, variant, accentColor, hsl }) => variantStyles(theme, variant, accentColor, hsl as keyof HSL)};
`;

export default StyledButton;

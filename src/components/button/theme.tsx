import { css, DefaultTheme } from "styled-components";

import { ButtonProps, scales } from "./types";
import { Svg } from "components/svg";

export interface ThemedProps extends ButtonProps {
  theme: DefaultTheme;
}

export const variantStyles = ({ theme, color, hoverColor, variant, isLoading }: ThemedProps) => {
  const bgColorPrimary = color ? theme.colors[color] : theme.colors.accent400;
  const bgColorPrimaryHover = hoverColor
    ? theme.colors[hoverColor]
    : color
    ? theme.colors[color]
    : theme.colors.accent500;
  const textColorPrimary = theme.isDark ? theme.colors.monochrome900 : theme.colors.monochrome0;

  const bgColorSecondary = color ? theme.colors[color] : theme.colors.monochrome900;
  const bgColorSecondaryHover = hoverColor
    ? theme.colors[hoverColor]
    : color
    ? theme.colors[color]
    : theme.colors.accent500;

  return {
    primary: css`
      background-color: ${bgColorPrimary};
      border: 1px solid ${bgColorPrimary};
      color: ${textColorPrimary};

      &:not([disabled]):hover {
        background-color: ${bgColorPrimaryHover};
        border: 1px solid ${bgColorPrimaryHover};
      }

      ${Svg} {
        fill: ${textColorPrimary};
      }

      &:disabled {
        background-color: ${!isLoading && theme.colors.monochrome400};
        border: 1px solid ${!isLoading && theme.colors.monochrome400};
        cursor: not-allowed;
      }
    `,

    outline: css`
      background-color: ${theme.colors.transparent};
      border: 1px solid ${bgColorSecondary};
      color: ${bgColorSecondary};

      &:not([disabled]):hover {
        border: 1px solid ${bgColorSecondaryHover};
        color: ${bgColorSecondaryHover};
        ${Svg} {
          fill: ${bgColorSecondaryHover};
        }
      }

      ${Svg} {
        fill: ${bgColorSecondary};
      }

      &:disabled {
        color: ${!isLoading && theme.colors.monochrome400};
        border: 1px solid ${!isLoading && theme.colors.monochrome400};
        cursor: not-allowed;

        ${Svg} {
          fill: ${!isLoading && theme.colors.monochrome400};
        }
      }
    `,
  }[variant!];
};

export const scaleVariants = {
  [scales.LG]: {
    padding: "16px 24px",
    minWidth: 120,
    fontSize: 18,
    lineHeight: "24px",
  },
  [scales.MD]: {
    padding: "9px 24px",
    minWidth: 100,
    fontSize: 16,
    lineHeight: "22px",
  },
  [scales.SM]: {
    padding: "8px 24px",
    minWidth: 80,
    fontSize: 12,
    lineHeight: "16px",
  },
};

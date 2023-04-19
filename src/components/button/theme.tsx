import { css, DefaultTheme } from "styled-components";
import { Colors } from "theme/types";
import { scales, Variant } from "./types";

export const variantStyles = (
  theme: DefaultTheme,
  variant: Variant = "primary",
  color: keyof Colors | undefined,
  hoverColor: keyof Colors | undefined,
) => {
  return {
    primary: css`
      background-color: ${color ? theme.colors[color] : theme.colors.accent400};

      &:not([disabled]):hover {
        background-color: ${hoverColor
          ? theme.colors[hoverColor]
          : color
          ? theme.colors[color]
          : theme.colors.accent500};
      }

      &:disabled {
        opacity: 0.33;
        cursor: not-allowed;
      }
    `,

    outline: css`
      background-color: ${theme.colors.transparent};
      border: 1px solid ${color ? theme.colors[color] : theme.colors.monochrome900};
      color: ${color ? theme.colors[color] : theme.colors.monochrome900};

      &:not([disabled]):hover {
        background-color: ${hoverColor
          ? theme.colors[hoverColor]
          : color
          ? theme.colors[color]
          : theme.colors.accent500};
        border: 1px solid
          ${hoverColor ? theme.colors[hoverColor] : color ? theme.colors[color] : theme.colors.accent500};
        color: ${theme.colors.monochrome0};
      }

      &:disabled {
        opacity: 0.33;
        cursor: not-allowed;
      }
    `,
  }[variant];
};

export const scaleVariants = {
  [scales.LG]: {
    padding: "18px 32px",
    minWidth: 120,
  },
  [scales.MD]: {
    padding: "14px 28px",
    minWidth: 100,
  },
  [scales.SM]: {
    padding: "6px 16px",
    minWidth: 53,
  },
};

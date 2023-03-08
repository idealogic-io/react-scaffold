import { css, DefaultTheme } from "styled-components";

import { Svg } from "components/svg";

import { Colors } from "theme/types";
import { scales, Variant } from "./types";

export const variantStyles = (theme: DefaultTheme, variant: Variant = "primary", color: keyof Colors | undefined) => {
  return {
    primary: css`
      background-color: ${({ theme }) => (color ? theme.colors[color] : theme.colors.accent500)};

      &:not([disabled]):hover {
        background-color: ${({ theme }) => (color ? theme.colors[color] : theme.colors.accent600)};
      }

      &:disabled {
        background-color: ${theme.colors.monochrome400};
        cursor: not-allowed;
      }
    `,

    outline: css`
      background-color: ${({ theme }) => theme.colors.transparent};
      border: 1px solid ${({ theme }) => (color ? theme.colors[color] : theme.colors.monochrome900)};
      color: ${({ theme }) => (color ? theme.colors[color] : theme.colors.monochrome900)};

      ${Svg} {
        fill: ${({ theme }) => (color ? theme.colors[color] : theme.colors.monochrome900)};
      }

      &:not([disabled]):hover {
        border: 1px solid ${theme.colors.accent500};
        color: ${theme.colors.accent500};

        ${Svg} {
          fill: ${({ theme }) => (color ? theme.colors[color] : theme.colors.accent500)};
        }
      }

      &:disabled {
        border: 1px solid ${({ theme }) => (color ? theme.colors[color] : theme.colors.accent400)};
        color: ${({ theme }) => (color ? theme.colors[color] : theme.colors.accent400)};
        cursor: not-allowed;
        opacity: 0.33;

        ${Svg} {
          fill: ${({ theme }) => (color ? theme.colors[color] : theme.colors.accent400)};
        }
      }
    `,
  }[variant];
};

export const scaleVariants = {
  [scales.SM]: {
    padding: "4px 24px",
    minWidth: "86px",
    fontSize: "12px",
  },
  [scales.MD]: {
    padding: "6px 24px",
    minWidth: "110px",
    fontSize: "16px",
  },
  [scales.LG]: {
    padding: "12px 24px",
    minWidth: "110px",
    fontSize: "18px",
  },
};

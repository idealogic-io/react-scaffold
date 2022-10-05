import { Svg } from "components/svg";
import { css, DefaultTheme } from "styled-components";
import { Colors, HSL } from "theme/types";
import { AccentColor, scales, Variant } from "./types";

export const variantStyles = (
  theme: DefaultTheme,
  variant: Variant = "primary",
  accentColor: AccentColor = "accent",
  hsl: keyof HSL,
) => {
  const focusHSL = +hsl + 100 >= 900 ? 900 : +hsl + 100;
  const color = `${accentColor}${hsl}` as unknown as keyof Colors;
  const focusColor = `${accentColor}${focusHSL}` as unknown as keyof Colors;

  const baseSecondaryHSL = accentColor === "accent" ? "900" : hsl;
  const secondaryAccentColor = accentColor === "accent" ? "monochrome" : accentColor;
  const secondaryColor = `${secondaryAccentColor}${baseSecondaryHSL}` as unknown as keyof Colors;

  return {
    primary: css`
      background-color: ${theme.colors[color]};
      border-color: ${theme.colors[color]};

      &:not([disabled]):hover {
        background-color: ${theme.colors[focusColor]};
        border-color: ${theme.colors[focusColor]};
      }
    `,

    secondary: css`
      background-color: ${theme.colors.transparent};
      border-color: ${theme.colors[secondaryColor]};
      color: ${theme.colors[secondaryColor]};

      ${Svg} {
        fill: ${({ theme }) => theme.colors[secondaryColor]};
      }

      &:hover {
        border-color: ${theme.colors[focusColor]};
        color: ${theme.colors[focusColor]};

        ${Svg} {
          fill: ${({ theme }) => theme.colors[focusColor]};
        }
      }

      &:disabled {
        background-color: ${theme.colors.transparent};
        border-color: ${theme.colors.monochrome400};
        color: ${theme.colors.monochrome400};

        ${Svg} {
          fill: ${({ theme }) => theme.colors.monochrome400};
        }
      }
    `,
  }[variant];
};

export const scaleVariants = {
  [scales.SM]: {
    padding: "4px 24px",
    minWidth: "86px",
  },
  [scales.MD]: {
    padding: "6px 24px",
    minWidth: "110px",
  },
  [scales.LG]: {
    padding: "12px 24px",
    minWidth: "110px",
  },
};

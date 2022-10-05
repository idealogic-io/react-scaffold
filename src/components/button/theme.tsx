import { css, DefaultTheme } from "styled-components";
import { scales, Variant } from "./types";

export const variantStyles = (theme: DefaultTheme, variant: Variant = "primary") => {
  return {
    primary: css`
      background-color: ${theme.colors.monochrome300};
      color: ${theme.colors.monochrome0};
    `,

    secondary: css`
      background-color: "transparent";
      border: "2px solid";
      border-color: ${theme.colors.monochrome300};
      box-shadow: "none";
      color: ${theme.colors.monochrome300};
      &:disabled {
        background-color: "transparent";
      }
    `,
  }[variant];
};

export const scaleVariants = {
  [scales.MD]: {
    height: "48px",
    width: "150px",
    padding: "0 24px",
  },
  [scales.SM]: {
    height: "32px",
    width: "100px",
    padding: "0 16px",
  },
};

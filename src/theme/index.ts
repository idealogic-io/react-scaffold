export { darkColors, lightColors } from "./colors";
export { default as dark } from "./dark";
export { default as light } from "./light";
export { appearanceAnimationVariants, appearanceAnimationMap } from "./animations";

import { Colors, Fonts, FontWeight, MediaQueries, Radii, Shadows, ZIndices, HSL, Breakpoints } from "./types";

export interface CustomTheme {
  siteWidth: number;
  breakpoints: Breakpoints;
  mediaQueries: MediaQueries;
  shadows: Shadows;
  radii: Radii;
  zIndices: ZIndices;
  fontWeight: FontWeight;
  colors: Colors;
  isDark: boolean;
  fonts: Fonts;
  hsl: HSL;
}

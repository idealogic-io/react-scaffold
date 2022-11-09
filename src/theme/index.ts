export { darkColors, lightColors } from "./colors";
export { default as dark } from "./dark";
export { default as light } from "./light";
export { appearanceAnimationVariants, appearanceAnimationMap } from "./animations";

import { BreakpointsMap, Colors, Fonts, FontWeight, MediaQueries, Radii, Shadows, ZIndices, HSL } from "./types";

export interface CustomTheme {
  siteWidth: number;
  breakpointMap: BreakpointsMap;
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

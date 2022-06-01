export { darkColors, lightColors } from "./colors";
export { default as dark } from "./dark";
export { default as light } from "./light";
import { BreakpointsMap, Colors, FStyles, MediaQueries, Radii, Shadows, ZIndices } from "./types";

export interface CustomTheme {
  siteWidth: number;
  breakpointMap: BreakpointsMap;
  mediaQueries: MediaQueries;
  shadows: Shadows;
  radii: Radii;
  zIndices: ZIndices;
  fontsStyles: FStyles;
  colors: Colors;
  isDark: boolean;
}

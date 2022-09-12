import { mediaQueries, breakpointMap, shadows, radii, zIndices, fontWeight, fonts } from "./base";
import { baseColors, darkColors } from "./colors";

export type MediaQueries = typeof mediaQueries;

export type BreakpointsMap = typeof breakpointMap;

export type Radii = typeof radii;

export type Shadows = typeof shadows;

export type FontWeight = typeof fontWeight;

export type Fonts = typeof fonts;

export type ZIndices = typeof zIndices;

export type BaseColors = {
  [property in keyof typeof baseColors]: string;
};

export type CustomColors = {
  [property in keyof typeof darkColors]: string;
};

export interface Colors extends BaseColors, CustomColors {}

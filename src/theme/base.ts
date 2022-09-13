export const breakpointMap = {
  xs: 320,
  sm: 425,
  md: 550,
  lg: 768,
  xl: 1080,
  xxl: 1200,
} as const;

export const mediaQueries = {
  xs: `@media screen and (min-width: ${breakpointMap.xs}px)`,
  sm: `@media screen and (min-width: ${breakpointMap.sm}px)`,
  md: `@media screen and (min-width: ${breakpointMap.md}px)`,
  lg: `@media screen and (min-width: ${breakpointMap.lg}px)`,
  xl: `@media screen and (min-width: ${breakpointMap.xl}px)`,
  xxl: `@media screen and (min-width: ${breakpointMap.xxl}px)`,
} as const;

export const shadows = {
  button: "0px -1px 0px 0px rgba(14, 14, 44, 0.4) inset",
  tooltip: "0px 0px 2px rgba(0, 0, 0, 0.2), 0px 4px 12px -8px rgba(14, 14, 44, 0.1)",
} as const;

export const radii = {
  small: "4px",
  medium: "16px",
  large: "24px",
  circle: "50%",
} as const;

export const zIndices = {
  dropdown: 10,
  modal: 100,
} as const;

export const fontWeight = {
  bold: 900,
  medium: 600,
  regular: 400,
} as const;

export const fonts = {
  mv: "MerriWeather",
} as const;

export default {
  siteWidth: 1200,
  breakpointMap,
  mediaQueries,
  shadows,
  radii,
  zIndices,
  fonts,
  fontWeight,
};

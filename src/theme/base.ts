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
  card: "0px 0px 30px rgba(202, 199, 226, 0.5)",
  list: "0px 2px 2px rgba(202, 199, 226, 0.5)",
  switcher: "0px 1px 1px rgba(170, 168, 183, 0.5)",
} as const;

export const radii = {
  small: "4px",
  semiMedium: "8px",
  medium: "16px",
  large: "24px",
  circle: "50%",
} as const;

export const zIndices = {
  dropdown: 10,
  modal: 100,
  tooltip: 101,
} as const;

export const fontWeight = {
  bold: 900,
  medium: 600,
  regular: 400,
} as const;

export const fonts = {
  mv: "MerriWeather",
} as const;

export const hsl = {
  "50": 50,
  "100": 100,
  "200": 200,
  "300": 300,
  "400": 400,
  "500": 500,
  "800": 800,
  "900": 900,
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
  hsl,
};

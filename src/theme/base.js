export const breakpointMap = {
  xs: 320,
  sm: 425,
  md: 550,
  lg: 768,
  xl: 1080,
  xxl: 1200,
};

const mediaQueries = {
  xs: `@media screen and (max-width: ${breakpointMap.xs}px)`,
  sm: `@media screen and (max-width: ${breakpointMap.sm}px)`,
  md: `@media screen and (max-width: ${breakpointMap.md}px)`,
  lg: `@media screen and (max-width: ${breakpointMap.lg}px)`,
  xl: `@media screen and (max-width: ${breakpointMap.xl}px)`,
  xxl: `@media screen and (max-width: ${breakpointMap.xxl}px)`,
};

const shadows = {
  button: "0px -1px 0px 0px rgba(14, 14, 44, 0.4) inset",
};

const radii = {
  small: "4px",
  medium: "16px",
  large: "24px",
  circle: "50%",
};

const zIndices = {
  dropdown: 10,
  modal: 100,
};

const fontWeight = {
  bold: 900,
  medium: 600,
  regular: 400,
};

const fonts = {
  mv: "MerriWeather",
};

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

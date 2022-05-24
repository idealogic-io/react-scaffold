export const breakpointMap = {
  xs: 370,
  sm: 576,
  md: 852,
  lg: 968,
  xl: 1080,
  xxl: 1200,
};

const mediaQueries = {
  xs: `@media screen and (min-width: ${breakpointMap.xs}px)`,
  sm: `@media screen and (min-width: ${breakpointMap.sm}px)`,
  md: `@media screen and (min-width: ${breakpointMap.md}px)`,
  lg: `@media screen and (min-width: ${breakpointMap.lg}px)`,
  xl: `@media screen and (min-width: ${breakpointMap.xl}px)`,
  xxl: `@media screen and (min-width: ${breakpointMap.xxl}px)`,
  nav: `@media screen and (min-width: ${breakpointMap.lg}px)`,
};

const shadows = {
  tooltip: "0px 0px 2px rgba(0, 0, 0, 0.2), 0px 4px 12px -8px rgba(14, 14, 44, 0.1)",
  button: "0px -1px 0px 0px rgba(14, 14, 44, 0.4) inset",
};

const spacing = [0, 4, 8, 16, 24, 32, 48, 64];

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

export const fontsStyles = {
  mv: {
    regular: {
      "font-family": "MerriWeather",
      "font-weight": "400",
      "font-style": "normal",
    },
    bold: {
      "font-family": "MerriWeather",
      "font-weight": "700",
      "font-style": "normal",
    },
  },
};

const fontSize = {
  title1: "32px",
  title2: "24px",
  text1: "16px",
  text2: "14px",
};

export default {
  siteWidth: 1200,
  breakpointMap,
  mediaQueries,
  spacing,
  shadows,
  radii,
  zIndices,
  fontsStyles,
  fontSize,
};

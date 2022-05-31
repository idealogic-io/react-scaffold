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

const mvFontStyle = {
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
};

export const fontsStyles = {
  mv: mvFontStyle,
};

export default {
  siteWidth: 1200,
  breakpointMap,
  mediaQueries,
  shadows,
  radii,
  zIndices,
  fontsStyles,
};

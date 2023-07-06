export const breakpointMap = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
} as const;

export const breakpointsArray = ["320px", "375px", "425px", "768px", "1024px", "1440px"];

export const breakpoints = Object.assign(breakpointsArray, {
  mobileS: breakpointsArray[0],
  mobileM: breakpointsArray[1],
  mobileL: breakpointsArray[2],
  tablet: breakpointsArray[3],
  laptop: breakpointsArray[4],
  laptopL: breakpointsArray[5],
});

export const mediaQueries = {
  mobileS: `@media screen and (min-width: ${breakpointsArray[0]})`,
  mobileM: `@media screen and (min-width: ${breakpointsArray[1]})`,
  mobileL: `@media screen and (min-width: ${breakpointsArray[2]})`,
  tablet: `@media screen and (min-width: ${breakpointsArray[3]})`,
  laptop: `@media screen and (min-width: ${breakpointsArray[4]})`,
  laptopL: `@media screen and (min-width: ${breakpointsArray[5]})`,
} as const;

export const shadows = {
  card: "0px 0px 30px rgba(202, 199, 226, 0.5);",
  tooltip: "0px 40px 64px -12px rgba(0, 0, 0, 0.02), 0px 32px 48px -8px rgba(0, 0, 0, 0.08)",
  list: "0px 2px 2px rgba(202, 199, 226, 0.5);",
  switcher: "0px 1px 1px rgba(170, 168, 183, 0.5);",
} as const;

export const radii = {
  semiSmall: "4px",
  small: "6px",
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

export default {
  siteWidth: 1200,
  breakpoints,
  mediaQueries,
  shadows,
  radii,
  zIndices,
  fonts,
  fontWeight,
};

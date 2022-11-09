export const breakpointMap = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
} as const;

export const mediaQueries = {
  mobileS: `@media screen and (min-width: ${breakpointMap.mobileS}px)`,
  mobileM: `@media screen and (min-width: ${breakpointMap.mobileM}px)`,
  mobileL: `@media screen and (min-width: ${breakpointMap.mobileL}px)`,
  tablet: `@media screen and (min-width: ${breakpointMap.tablet}px)`,
  laptop: `@media screen and (min-width: ${breakpointMap.laptop}px)`,
  laptopL: `@media screen and (min-width: ${breakpointMap.laptopL}px)`,
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

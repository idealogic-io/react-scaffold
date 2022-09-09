export type Breakpoints = string[];

export type MediaQueries = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
};

export type BreakpointsMap = {
  [property in keyof MediaQueries]: number;
};

export type Radii = {
  small: string;
  medium: string;
  large: string;
  circle: string;
};

export type Shadows = {
  button: string;
  tooltip: string;
};

export type SingleFontStyle = {
  [key: string]: string;
};

export type FontWeight = {
  bold: 900;
  medium: 600;
  regular: 400;
};

export type Fonts = {
  mv: string;
};

export type ZIndices = {
  dropdown: number;
  modal: number;
};

export type BaseColors = {
  primary: string;
  secondary: string;
  error: string;
  warning: string;
  success: string;
  black: string;
  white: string;
};

export interface Colors extends BaseColors {
  background: string;
  input: string;
  text: string;
  backgroundDisabled: string;
}

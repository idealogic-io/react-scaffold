export const baseColors = {
  primary: "#7E75C9",
  secondary: "#F4587E",
  error: "#F3263E",
  warning: "#FFB119",
  success: "#0ADB1F",
  info: "#415FD7",
  black: "#333333",
  disable: "#8F9DBC",
  white: "#ffffff",
  transparent: "transparent",
} as const;

export const lightColors = {
  ...baseColors,
  background: "#FAF9FA",
  input: "#D4D9DE",
  text: "#280D5F",
  backgroundDisabled: "#E9EAEB",

  // Put light colors here
} as const;

export const darkColors = {
  ...baseColors,
  background: "#08060B",
  input: "#D4D9DE",
  text: "#ffffff",
  backgroundDisabled: "#3c3742",
  // Put dark colors here
} as const;

import { BaseColors, Colors } from "./types";

const baseColors: BaseColors = {
  primary: "#7E75C9",
  secondary: "#F4587E",
  error: "#DE0000",
  warning: "#EF9200",
  success: "#00C898",
  black: "#333333",
  white: "#ffffff",
};

const lightColors: Colors = {
  ...baseColors,
  background: "#FAF9FA",
  input: "#D4D9DE",
  text: "#280D5F",
  backgroundDisabled: "#E9EAEB",

  // Put light colors here
};

const darkColors: Colors = {
  ...baseColors,
  background: "#08060B",
  input: "#D4D9DE",
  text: "#ffffff",
  backgroundDisabled: "#3c3742",
  // Put dark colors here
};

export { baseColors, lightColors, darkColors };

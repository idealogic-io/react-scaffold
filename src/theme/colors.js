const baseColors = {
  primary: "#7E75C9",
  secondary: "#F4587E",
  error: "#DE0000",
  warning: "#EF9200",
  success: "#00C898",
  black: "#333333",
  white: "#ffffff",
};

const lightColors = {
  ...baseColors,
  background: "#FAF9FA",
  input: "#D4D9DE",
  text: "#280D5F",
  backgroundDisabled: "#E9EAEB",

  // Put light colors here
};

const darkColors = {
  ...baseColors,
  background: "#08060B",
  input: "#D4D9DE",
  text: "#ffffff",
  backgroundDisabled: "#3c3742",
  // Put dark colors here
};

export { baseColors, lightColors, darkColors };

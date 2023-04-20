const REGEX = {
  includesVariableRegex: new RegExp(/%\S+?%/, "gm"),
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
  numericInputRegex: /^[0-9]*[.,]?[0-9]*$/,
  onlyNumbers: /^[0-9]*$/,
};

export default REGEX;

const REGEX = {
  includesVariableRegex: new RegExp(/%\S+?%/, "gm"),
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
};

export default REGEX;

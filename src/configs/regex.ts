const REGEX = {
  includesVariableRegex: new RegExp(/%\S+?%/, "gm"),
  // eslint-disable-next-line no-useless-escape
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~])(?=.{8,})/,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  numericInputRegex: /^[0-9]*[.,]?[0-9]*$/,
  onlyNumbers: /^[0-9]*$/,
  zerosAfterDot: /\.?0+$/,
};

export default REGEX;

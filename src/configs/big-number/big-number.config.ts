import BigNumber from "bignumber.js";

BigNumber.config({
  FORMAT: {
    // string to prepend
    prefix: "",
    // decimal separator
    decimalSeparator: ".",
    // grouping separator of the integer part
    groupSeparator: "",
    // primary grouping size of the integer part
    groupSize: 3,
    // secondary grouping size of the integer part
    secondaryGroupSize: 0,
    // grouping separator of the fraction part
    fractionGroupSeparator: " ",
    // grouping size of the fraction part
    fractionGroupSize: 0,
    // string to append
    suffix: "",
  },
  DECIMAL_PLACES: 18, // to what decimal place will the number be rounded after division
  EXPONENTIAL_AT: 1e9, // parameter only for the "toString" method, determines how many characters before and after the comma are allowed until the conversion to "1e+9" or "1e-9" format occurs, the specified value will almost never allow this
});

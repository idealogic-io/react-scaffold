import BigNumber from "bignumber.js";

// ATTENTION!!! When working with BN, always use formatValueToBNString(arg) to get value.

BigNumber.config({
  FORMAT: {
    // string to prepend
    prefix: "",
    // decimal separator
    decimalSeparator: ".",
    // grouping separator of the integer part
    groupSeparator: ",",
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

// *.minus()* subtraction left minus argument from brackets
// *.plus()* addition of left with parentheses
// *.div()* .div(number | string | BigNumber) dividing the left into parentheses
// *.times()* x.multipliedBy(3) multiplication left by brackets

// *.toFixed()* converts a BigNumber to a string that is a regular number IF the argument is given the number of decimal places
// *.toFormat()* converts BigNumber to a string in the format specified in the configs. IT IS POSSIBLE to pass an object with new format configs to the argument
// *.toNumber()* converts BigNumber to number

// *.sum()* .sum(n...) ⇒ BigNumber let sumRes = BigNumber.sum(4e9, BigNumber, '123456789.9') adds all arguments from parentheses
// *.dp()* x.decimalPlaces(1) or x.dp() rounds up to the specified decimal place, if the argument is absent then returns a value equal to the number of decimal places 1.123.dp() will return 3
// *.pow()* exponentiatedBy(2) or .pow(2) exponentiation, in this case 2
// *.eq()* .isEqualTo(number|string|BigNumber) or .eq() equality test, returns true/false
// *.gt()* .isGreaterThan(number|string|BigNumber) is left greater than right true/false
// *.gte()* .isGreaterThanOrEqualTo( number|string|BigNumber) greater than or equal left over right true/false
// *.lt()* .isLessThan(number|string|BigNumber) Is left less than right true/false
// *.lte()* .isLessThanOrEqualTo(number|string|BigNumber) LESS than or equal to left of right true/false
// *.mod()* will return the remainder of the division of the left by the right, analogue of %

// const num1 = BigNumber("1234567890123456789.123456789012345678901");
// const num2 = BigNumber(10000);
// const num3 = BigNumber(3);
// const res = num2.div(num3);

// console.log("toFormat", num1.toFormat()); // 1,234,567,890,123,456,789.123456789012345678901
// console.log("toFixed", num1.toFixed()); //1234567890123456789.123456789012345678901
// console.log("toString", num1.toString()); //1234567890123456789.123456789012345678901 если изминить параметр EXPONENTIAL_AT можетвозвращать значение в "е" формате
// console.log("res", res.toFormat(), res.toFixed(), res.toString()); //3,333.333333333333333333 3333.333333333333333333 3333.333333333333333333
// console.log( BigNumber(7).mod(2).toFixed()); //1
// console.log(BigNumber("12345678901234567890.12345678901234567890").toString());

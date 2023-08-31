ATTENTION!!! When working with BN, always use formatValueToBNString(arg) to get value.

_.minus()_ subtraction left minus argument from brackets
_.plus()_ addition of left with parentheses
_.div()_ .div(number | string | BigNumber) dividing the left into parentheses
_.times()_ x.multipliedBy(3) multiplication left by brackets

_.toFixed()_ converts a BigNumber to a string that is a regular number IF the argument is given the number of decimal places
_.toFormat()_ converts BigNumber to a string in the format specified in the configs. IT IS POSSIBLE to pass an object with new format configs to the argument
_.toNumber()_ converts BigNumber to number

_.sum()_ .sum(n...) ⇒ BigNumber let sumRes = BigNumber.sum(4e9, BigNumber, '123456789.9') adds all arguments from parentheses
_.dp()_ x.decimalPlaces(1) or x.dp() rounds up to the specified decimal place, if the argument is absent then returns a value equal to the number of decimal places 1.123.dp() will return 3
_.pow()_ exponentiatedBy(2) or .pow(2) exponentiation, in this case 2
_.eq()_ .isEqualTo(number|string|BigNumber) or .eq() equality test, returns true/false
_.gt()_ .isGreaterThan(number|string|BigNumber) is left greater than right true/false
_.gte()_ .isGreaterThanOrEqualTo( number|string|BigNumber) greater than or equal left over right true/false
_.lt()_ .isLessThan(number|string|BigNumber) Is left less than right true/false
_.lte()_ .isLessThanOrEqualTo(number|string|BigNumber) LESS than or equal to left of right true/false
_.mod()_ will return the remainder of the division of the left by the right, analogue of %
_.toFormatExtended()_ will return the a formatted value without trailing zeros

const num1 = BigNumber("1234567890123456789.123456789012345678901");
const num2 = BigNumber(10000);
const num3 = BigNumber(3);
const res = num2.div(num3);

console.log("toFormat", num1.toFormat()); 1,234,567,890,123,456,789.123456789012345678901
console.log("toFixed", num1.toFixed()); //1234567890123456789.123456789012345678901
console.log("toString", num1.toString()); //1234567890123456789.123456789012345678901 если изминить параметр EXPONENTIAL_AT можетвозвращать значение в "е" формате
console.log("res", res.toFormat(), res.toFixed(), res.toString()); //3,333.333333333333333333 3333.333333333333333333 3333 333333333333333333
console.log( BigNumber(7).mod(2).toFixed()); //1
console.log(BigNumber("12345678901234567890.12345678901234567890").toString());
console.log(BigNumber("12345678901234567890").toFormatExtended(8)); 12345678901234567890
console.log(BigNumber("12345678901234567890.0000010000").toFormatExtended(8)); 12345678901234567890.000001

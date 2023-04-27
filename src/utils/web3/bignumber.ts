import BigNumber from "bignumber.js";

/**
 * toFixed() method rounds string to 18 decimals after 0. But it lefts additional zeros after a number.
 * BigNumber(1).toFixed(18) returns 1.000000000000000000.
 * To remove zeros we wrap value with BigNumber and use toString() method
 * @param value any value
 */
export const formatValueToBNString = (value: BigNumber | string | number | null | undefined) => {
  return value ? BigNumber(BigNumber(value).toFixed(18)).toString() : "0";
};

import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits, parseUnits } from "@ethersproject/units";

export const parseUnitsToDecimals = (number: string | number, decimals: number) => {
  if (typeof number === "string") {
    return parseUnits(number, decimals).toNumber();
  } else if (typeof number === "number") {
    return parseUnits(String(number), decimals).toNumber();
  } else {
    return number;
  }
};

/**
 * Method to format the display of wei given an BigNumber object
 * Note: does NOT round
 */
export const formatBigNumber = (number: BigNumber, displayDecimals = 18, decimals = 18) => {
  const remainder = number.mod(BigNumber.from(10).pow(decimals - displayDecimals));
  return formatUnits(number.sub(remainder), decimals);
};

/**
 * Method to format the display of wei given an BigNumber object with toFixed
 * Note: rounds
 */
export const formatBigNumberToFixed = (number: BigNumber, displayDecimals = 18, decimals = 18) => {
  const formattedString = formatUnits(number, decimals);
  return (+formattedString).toFixed(displayDecimals);
};

/**
 * Formats a FixedNumber like BigNumber
 * i.e. Formats 9763410526137450427.1196 into 9.763 (3 display decimals)
 */
export const formatFixedNumber = (number: BigNumber, displayDecimals = 18, decimals = 18) => {
  // Remove decimal
  const [leftSide] = number.toString().split(".");
  return formatBigNumber(BigNumber.from(leftSide), displayDecimals, decimals);
};

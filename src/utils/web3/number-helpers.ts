import { BigNumber as EthersBigNumber } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";

/**
 * Method to format the display of wei given an BigNumber object
 * Note: does NOT round
 */
export const formatBigNumber = (number: EthersBigNumber, displayDecimals = 18, decimals = 18) => {
  const remainder = number.mod(EthersBigNumber.from(10).pow(decimals - displayDecimals));
  return formatUnits(number.sub(remainder), decimals);
};

/**
 * Method to format the display of wei given an BigNumber object with toFixed
 * Note: rounds
 */
export const formatBigNumberToFixed = (number: EthersBigNumber, displayDecimals = 18, decimals = 18) => {
  const formattedString = formatUnits(number, decimals);
  return (+formattedString).toFixed(displayDecimals);
};

/**
 * Formats a FixedNumber like BigNumber
 * i.e. Formats 9763410526137450427.1196 into 9.763 (3 display decimals)
 */
export const formatFixedNumber = (number: EthersBigNumber, displayDecimals = 18, decimals = 18) => {
  // Remove decimal
  const [leftSide] = number.toString().split(".");
  return formatBigNumber(EthersBigNumber.from(leftSide), displayDecimals, decimals);
};

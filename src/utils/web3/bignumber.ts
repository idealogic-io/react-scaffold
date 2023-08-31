import BigNumber from "bignumber.js";

export const formatValueToBNString = (value: BigNumber | string | number | null | undefined, decimals = 18) => {
  return value ? BigNumber(value).toFormatExtended(decimals) : "0";
};

import BigNumber from "bignumber.js";

type ExtendedFunctions = {
  /**
   * This method formats value to desired format without trailing zeros
   */
  toFormatExtended(decimalPlaces: number, roundingMode?: BigNumber.RoundingMode): string;
};

declare module "bignumber.js" {
  export interface BigNumber extends ExtendedFunctions {}
}

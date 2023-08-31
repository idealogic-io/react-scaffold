import BigNumber from "bignumber.js";
import REGEX from "../regex";
/**
 * This method formats value to desired format without trailing zeros
 */
BigNumber.prototype.toFormatExtended = function (decimalPlaces: number, roundingMode = BigNumber.ROUND_DOWN) {
  return this.toFormat(decimalPlaces, roundingMode).replace(REGEX.zerosAfterDot, "");
};

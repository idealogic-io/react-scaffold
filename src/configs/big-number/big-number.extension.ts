import BigNumber from "bignumber.js";
import REGEX from "../regex";
/**
 * This method formats value to desired format without trailing zeros
 */
BigNumber.prototype.toFormatExtended = function (decimalPlaces: number, roundingMode = BigNumber.ROUND_DOWN) {
  return this.toFormat(decimalPlaces, roundingMode).replace(REGEX.zerosAfterDot, "");
};

BigNumber.prototype.decimalExponentFormat = function (power: BigNumber | string | number, increase: boolean = true) {
  return increase ? this.multipliedBy(BigNumber(10).pow(power)) : this.dividedBy(BigNumber(10).pow(power));
};

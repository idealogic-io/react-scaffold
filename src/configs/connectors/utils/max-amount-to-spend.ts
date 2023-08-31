import BigNumber from "bignumber.js";
import { Currency, CurrencyAmount } from "../entities";

const MIN_NATIVE_CURRENCY_FOR_GAS = BigNumber(10).toExponential(16); // .01 ETH
/**
 * Given some token amount, return the max that can be spent of it
 * @param currencyAmount to return max of
 */
export const maxAmountToSpend = (currencyAmount?: CurrencyAmount<Currency>) => {
  if (!currencyAmount) return undefined;

  if (currencyAmount.currency.isNative) {
    if (currencyAmount.amount.isGreaterThan(MIN_NATIVE_CURRENCY_FOR_GAS)) {
      const amountMinusGas = currencyAmount.amount.minus(MIN_NATIVE_CURRENCY_FOR_GAS);
      return new CurrencyAmount(currencyAmount.currency, amountMinusGas);
    } else {
      return currencyAmount;
    }
  }
  return currencyAmount;
};

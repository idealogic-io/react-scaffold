import { Currency, CurrencyAmount } from "../entities";
import { ZERO } from "../constants";

const MIN_NATIVE_CURRENCY_FOR_GAS = 0.01;
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
      return new CurrencyAmount(currencyAmount.currency, ZERO);
    }
  }
  return currencyAmount;
};

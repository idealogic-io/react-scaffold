import { ChainId, Currency, CurrencyAmount } from "configs/web3";

export type CurrencyProps = {
  currency: Currency;
  currencyAmount: CurrencyAmount<Currency> | undefined;
  chainId?: ChainId;
};

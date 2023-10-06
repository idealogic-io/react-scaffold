import { ChainId, Currency, CurrencyAmount } from "configs/connectors";

export type CurrencyProps = {
  currency: Currency;
  currencyAmount: CurrencyAmount<Currency> | undefined;
  chainId?: ChainId;
};

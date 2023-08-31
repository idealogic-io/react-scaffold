import { Currency, CurrencyAmount } from "configs/connectors";

export type CurrencyProps = {
  currency: Currency;
  currencyAmount: CurrencyAmount<Currency> | undefined;
  account: string | undefined;
};

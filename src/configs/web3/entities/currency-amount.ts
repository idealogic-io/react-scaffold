import BigNumber from "bignumber.js";
import { BigNumber as EthersBigNumber } from "@ethersproject/bignumber";
import { formatUnits, parseUnits } from "@ethersproject/units";

import { Currency } from "./currency";
import { ZERO } from "../constants";

export class CurrencyAmount<T extends Currency> {
  public amount: BigNumber;

  constructor(
    public currency: T,
    amount: EthersBigNumber | BigNumber,
  ) {
    try {
      this.amount = amount instanceof EthersBigNumber ? BigNumber(formatUnits(amount, currency.decimals)) : amount;
    } catch (error) {
      console.error("Can't format value:", currency.symbol, amount.toString());
      this.amount = ZERO;
    }
  }

  toEthersBigNumber(): EthersBigNumber {
    return parseUnits(this.amount.toString(), this.currency.decimals);
  }
}

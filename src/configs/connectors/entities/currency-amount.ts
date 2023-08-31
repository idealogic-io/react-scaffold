import BigNumber from "bignumber.js";
import { BigNumber as EthersBigNumber } from "ethers";
import { formatUnits } from "@ethersproject/units";

import { Currency } from "./currency";

export class CurrencyAmount<T extends Currency> {
  public amount: BigNumber;

  constructor(public currency: T, amount: EthersBigNumber | BigNumber) {
    try {
      this.amount = amount instanceof EthersBigNumber ? BigNumber(formatUnits(amount, currency.decimals)) : amount;
    } catch (error) {
      console.error("Can't format value:", currency.symbol, amount.toString());
      this.amount = BigNumber(0);
    }
  }
}

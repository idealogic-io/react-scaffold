import BigNumber from "bignumber.js";

export class Token {
  constructor(
    public chainId: number,
    public address: string,
    public decimals: number,
    public symbol: string,
    public name: string,
  ) {}
}

export class TokenAmount {
  constructor(public token: Token, public amount: BigNumber) {}
}

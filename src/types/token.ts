export class Token {
  constructor(
    public chainId: number,
    public address: string,
    public decimals: number,
    public symbol: string,
    public name: string,
  ) {}
}

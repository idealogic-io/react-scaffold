export interface TokenInfo {
  readonly chainId: number;
  readonly address: string;
  readonly name: string;
  readonly decimals: number;
  readonly symbol: string;
  readonly logoURI?: string;
  readonly tags?: string[];
}

export interface TokenList {
  readonly name: string;
  readonly version: string;
  readonly tokens: TokenInfo[];
}

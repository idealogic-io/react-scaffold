import { Token } from "configs/web3/entities";

export interface TokenInfo {
  readonly chainId: number;
  readonly address: string;
  readonly name: string;
  readonly decimals: number;
  readonly symbol: string;
  readonly logoURI?: string;
  readonly tags?: string[];
  readonly coingeckoId?: string;
}

export type TokenList = TokenInfo[];

export type TokenMap = { [tokenAddress: string]: Token };

export type TokenAddressMap = { [chainId: number]: TokenMap };

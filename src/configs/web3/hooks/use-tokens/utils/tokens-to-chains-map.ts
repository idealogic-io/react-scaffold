import { TokenList, Token } from "configs/web3";

export type TokenMap = { [tokenAddress: string]: Token };

export type TokenAddressMap = { [chainId: number]: TokenMap };

export const tokensToChainMap = (tokens: TokenList): TokenAddressMap => {
  const map = tokens.tokens.reduce<TokenAddressMap>((map, info) => {
    try {
      const token = new Token(info.chainId, info.address, info.decimals, info.symbol, info.name);

      if (map[token.chainId]?.[token.address] !== undefined) {
        console.warn(`Duplicate token skipped: ${token.address}`);
        return map;
      }

      if (!map[token.chainId]) {
        map[token.chainId] = {};
      }

      map[token.chainId][token.address] = token;

      return map;
    } catch {
      return map;
    }
  }, {});

  return map;
};

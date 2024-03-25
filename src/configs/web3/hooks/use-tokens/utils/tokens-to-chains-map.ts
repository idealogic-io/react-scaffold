import { TokenList, Token, TokenAddressMap } from "configs/web3";

export const tokensToChainMap = (tokens: TokenList): TokenAddressMap => {
  const map = tokens.reduce<TokenAddressMap>((map, info) => {
    try {
      const token = new Token(
        info.chainId,
        info.address,
        info.decimals,
        info.symbol,
        info.name,
        undefined,
        info.logoURI,
        info.coingeckoId,
      );

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

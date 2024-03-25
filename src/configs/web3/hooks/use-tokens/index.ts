import useSWR from "swr";
import { useMemo } from "react";

import { MAINNET_CHAIN_IDS, TOKENS_URLS, Token, TokenMap, nativeOnChain } from "configs/web3";
import { ChainId } from "configs/web3/types";
import { useAppDispatch, useAppSelector } from "store/store";
import { getTokensListByChain } from "store/tokens/actions";

export const useFetchTokensMap = () => {
  const dispatch = useAppDispatch();

  useSWR("getTokenList", () => dispatch(getTokensListByChain({ urls: TOKENS_URLS, additionalTokens: [] })), {
    revalidateOnFocus: false,
  });
};

export const useTokensByChainId = (chainId: ChainId | undefined): { tokens: TokenMap; isLoading: boolean } => {
  const tokensList = useAppSelector(state => state.tokens.tokensList);
  const pending = useAppSelector(state => state.tokens.pending);

  return useMemo(() => {
    const tokens = tokensList && chainId && chainId in tokensList ? tokensList[chainId] : {};

    return { tokens, isLoading: pending };
  }, [tokensList, pending, chainId]);
};

export const useCurrencyListByChainId = (chainId: ChainId | undefined) => {
  const { tokens, isLoading } = useTokensByChainId(chainId);

  return useMemo(() => {
    const native = nativeOnChain(chainId || MAINNET_CHAIN_IDS.MAINNET);
    // const wrapped = native.wrapped;
    // TODO wrapped tokens already coming from tokens.json
    // In next iteration u should uncomment next lines and add wrapped in list array
    const tokensList: Token[] = Object.values(tokens);
    // const filteredTokensList = tokensList.filter(token => !token.equals(wrapped) && !token.isNative);

    return { list: [native, ...tokensList], isLoading };
  }, [tokens, isLoading]);
};

import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";

import { TokenAddressMap, TokenMap, fetchAllTokens, tokensToChainMap } from "./utils";
import { useNativeCurrency } from "configs/connectors";

import { ChainId } from "configs/connectors/types";

export const useFetchTokensMap = () => {
  const { mutate } = useSWRConfig();

  const { isValidating } = useSWR("getTokensList", async () => {
    const tokens = await fetchAllTokens();

    const mapOfTokens = tokensToChainMap(tokens);

    mutate("tokensMap", mapOfTokens);
  });

  mutate("tokensMapLoading", isValidating);
};

export const useTokensByChainId = (chainId?: ChainId): { tokens: TokenMap; isLoading: boolean } => {
  const { data = {} } = useSWRImmutable<TokenAddressMap>("tokensMap");
  const { data: isLoading } = useSWRImmutable("tokensMapLoading");

  return { tokens: chainId && chainId in data ? data[chainId] : {}, isLoading };
};

export const useCurrencyListByChainId = (chainId?: ChainId) => {
  const { tokens, isLoading } = useTokensByChainId(chainId);
  const native = useNativeCurrency();
  const wrapped = native.wrapped;

  const tokensList = Object.values(tokens);

  const filteredTokensList = tokensList.filter(token => !token.equals(wrapped) && !token.isNative);

  return { list: [native, wrapped, ...filteredTokensList], isLoading };
};

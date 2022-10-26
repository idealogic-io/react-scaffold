import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";

import { Currency } from "types/currency";
import { Token } from "types/token";

import { nativeCurrencies, NATIVE_ADDRESS } from "configs";
import { isAddress } from "utils/web3";

import { useSingleCallResult, useTokenContract } from "hooks";
import { NEVER_RELOAD } from "hooks/multicall/constants";

export const useAllTokens = (): { [address: string]: Token } => {
  return {};
};

// undefined if invalid or does not exist
// null if loading
// otherwise returns the token
export const useToken = (tokenAddress?: string): Token | undefined | null => {
  const { chainId } = useWeb3React();
  const tokens = useAllTokens();

  const address = isAddress(tokenAddress ?? "");

  const tokenContract = useTokenContract(address || undefined, false);
  const token: Token | undefined = address ? tokens[address] : undefined;

  const tokenName = useSingleCallResult(token ? undefined : tokenContract, "name", undefined, NEVER_RELOAD);
  const symbol = useSingleCallResult(token ? undefined : tokenContract, "symbol", undefined, NEVER_RELOAD);
  const decimals = useSingleCallResult(token ? undefined : tokenContract, "decimals", undefined, NEVER_RELOAD);

  return useMemo(() => {
    if (token) {
      return token;
    }

    if (!chainId || !address) {
      return undefined;
    }

    if (decimals.loading || symbol.loading || tokenName.loading) {
      return null;
    }

    if (decimals.result) {
      return new Token(
        chainId,
        address,
        decimals.result[0],
        symbol.result?.[0] ?? "UNKNOWN",
        tokenName.result?.[0] ?? "Unknown Token",
      );
    }

    return undefined;
  }, [
    address,
    chainId,
    decimals.loading,
    decimals.result,
    symbol.loading,
    symbol.result,
    token,
    tokenName.loading,
    tokenName.result,
  ]);
};

export const useCurrency = (currencyId: string | undefined): Currency | Token | null | undefined => {
  const { chainId } = useWeb3React();
  const _chainId = chainId ?? 1;
  const isNative = currencyId?.toLowerCase() === NATIVE_ADDRESS;
  const token = useToken(isNative ? undefined : currencyId);
  return isNative ? nativeCurrencies[_chainId] : token;
};

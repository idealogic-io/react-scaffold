import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import useSWR from "swr";
import { Zero } from "@ethersproject/constants";
import { BigNumber } from "@ethersproject/bignumber";
import { Interface } from "@ethersproject/abi";
import { JSBI, Token, TokenAmount } from "@pancakeswap/sdk";

import { useMultipleContractSingleData, useSingleCallResult } from "./use-multicall";
import { useTokenContract } from "./use-contract";
import { getSimpleRpcProvider } from "utils/web3/simple-rpc";
import { FAST_INTERVAL, NATIVE_ADDRESS } from "configs";
import { isAddress } from "utils/web3";
import ERC20_ABI from "configs/abi/erc20.json";

export const useTokenBalance = (tokenAddress: string): { balance: BigNumber } => {
  const { account } = useWeb3React();

  const tokenContract = useTokenContract(tokenAddress, false);
  const balance = useSingleCallResult(account ? tokenContract : undefined, "balanceOf", [account!]);

  return { balance: balance.result?.[0] || Zero };
};

export const useNativeBalance = () => {
  const { account, chainId } = useWeb3React();

  const { data } = useSWR(
    account && chainId ? `${account}/nativeBalance/${chainId}` : null,
    async () => {
      const simpleRpcProvider = getSimpleRpcProvider(chainId!);
      return simpleRpcProvider.getBalance(account!);
    },
    { refreshInterval: FAST_INTERVAL },
  );

  return { balance: data || Zero };
};

export const useCurrencyBalance = (tokenAddress: string) => {
  const isNative = tokenAddress?.toLowerCase() === NATIVE_ADDRESS;

  const useBalance = isNative ? useNativeBalance : useTokenBalance;

  return useBalance(tokenAddress);
};

/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
export function useTokenBalances(
  address?: string,
  tokens?: (Token | undefined)[],
): [{ [tokenAddress: string]: TokenAmount | undefined }, boolean] {
  const validatedTokens: Token[] = useMemo(
    () =>
      tokens?.filter(
        (t?: Token): t is Token =>
          !!t && isAddress(t?.address) !== false && t?.address?.toLowerCase() !== NATIVE_ADDRESS,
      ) ?? [],
    [tokens],
  );

  const validatedTokenAddresses = useMemo(() => validatedTokens.map(vt => vt.address), [validatedTokens]);

  const balances = useMultipleContractSingleData(
    validatedTokenAddresses,
    new Interface(ERC20_ABI),
    "balanceOf",
    useMemo(() => [address], [address]),
  );

  const anyLoading: boolean = useMemo(() => balances.some(callState => callState.loading), [balances]);

  return [
    useMemo(
      () =>
        address && validatedTokens.length > 0
          ? validatedTokens.reduce<{ [tokenAddress: string]: TokenAmount | undefined }>((memo, token, i) => {
              const value = balances?.[i]?.result?.[0];
              const amount = value ? JSBI.BigInt(value.toString()) : undefined;

              if (amount) {
                memo[token.address] = new TokenAmount(token, amount);
              }

              return memo;
            }, {})
          : {},
      [address, validatedTokens, balances],
    ),
    anyLoading,
  ];
}

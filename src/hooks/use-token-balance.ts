import { useMemo } from "react";
import useSWR from "swr";
import { Zero } from "@ethersproject/constants";
import { BigNumber as EthersBigNumber } from "ethers";
import { formatUnits } from "@ethersproject/units";
import { Interface } from "@ethersproject/abi";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";

import { useMultipleContractSingleData, useTokenContract, useSWRContract, useNativeCurrency } from "hooks";

import { isAddress, FAST_INTERVAL, NATIVE_ADDRESS, getSimpleRpcProvider, isTokenNative } from "utils/web3";

import ERC20_ABI from "configs/abi/erc20.json";
import { Token, TokenAmount } from "types/token";

/**
 * Returns balance for selected token
 * @param token Token
 */
export const useTokenBalance = (token: Token) => {
  const { account } = useWeb3React();

  const contract = useTokenContract(token.address, false);

  const { data = Zero, isValidating } = useSWRContract(
    account && contract ? [contract, "balanceOf", [account]] : null,
    {
      refreshInterval: FAST_INTERVAL,
    },
  );

  return { balance: BigNumber(formatUnits(data, token.decimals)), isValidating };
};
/**
 * Returns native balance for supported chain id
 */
export const useNativeBalance = () => {
  const { account, chainId } = useWeb3React();
  const nativeCurrency = useNativeCurrency();

  const { data = Zero, isValidating } = useSWR(
    account && chainId ? `${account}/nativeBalance/${chainId}` : null,
    async () => {
      const simpleRpcProvider = getSimpleRpcProvider(chainId!);
      return await simpleRpcProvider.getBalance(account!);
    },
    { refreshInterval: FAST_INTERVAL },
  );

  return { balance: BigNumber(formatUnits(data, nativeCurrency?.decimals)), isValidating };
};
/**
 * Returns object that consists of token and it's balance. Works for native and not native token.
 * Note: BigNumber.js
 * @param token Token
 */
export const useTokenAmount = (token: Token) => {
  const { balance } = useTokenBalance(token);
  const { balance: nativeBalance } = useNativeBalance();

  const _balance = isTokenNative(token.address) ? nativeBalance : balance;

  return new TokenAmount(token, _balance);
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
              const amount: EthersBigNumber = balances?.[i]?.result?.[0] || Zero;

              memo[token.address] = new TokenAmount(token, BigNumber(formatUnits(amount, token.decimals)));

              return memo;
            }, {})
          : {},
      [address, validatedTokens, balances],
    ),
    anyLoading,
  ];
}

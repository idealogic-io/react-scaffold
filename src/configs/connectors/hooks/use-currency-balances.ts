import { Currency, CurrencyAmount, Token, nativeOnChain } from "configs/connectors";
import { useWeb3React } from "@web3-react/core";
import { Interface } from "@ethersproject/abi";
import { useMemo } from "react";

import { useMulticallContract, isAddress } from "configs/connectors";
import { useMultipleContractSingleData, useSingleContractMultipleData } from "hooks";
import { ERC20_ABI } from "configs/abi";

/**
 * Returns a map of the given addresses to their eventually consistent ETH balances.
 */
export const useNativeCurrencyBalances = (uncheckedAddresses?: (string | undefined)[]) => {
  const { chainId } = useWeb3React();
  const multicallContract = useMulticallContract();

  const validAddressInputs: [string][] = useMemo(
    () =>
      uncheckedAddresses
        ? uncheckedAddresses
            .map(isAddress)
            .filter((a): a is string => a !== false)
            .sort()
            .map(addr => [addr])
        : [],
    [uncheckedAddresses],
  );

  const results = useSingleContractMultipleData(multicallContract, "getEthBalance", validAddressInputs);

  return useMemo(
    () =>
      validAddressInputs.reduce<{ [address: string]: CurrencyAmount<Currency> }>((memo, [address], i) => {
        const value = results?.[i]?.result?.[0];
        if (value && chainId) {
          memo[address] = new CurrencyAmount(nativeOnChain(chainId), value);
        }

        return memo;
      }, {}),
    [validAddressInputs, chainId, results],
  );
};

const ERC20Interface = new Interface(ERC20_ABI);

/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
export const useTokenBalancesWithLoadingIndicator = (
  address?: string,
  tokens?: (Token | undefined)[],
): [{ [tokenAddress: string]: CurrencyAmount<Token> | undefined }, boolean] => {
  const { chainId } = useWeb3React();
  const validatedTokens: Token[] = useMemo(
    () => tokens?.filter((t?: Token): t is Token => isAddress(t?.address) !== false && t?.chainId === chainId) ?? [],
    [chainId, tokens],
  );
  const validatedTokenAddresses = useMemo(() => validatedTokens.map(vt => vt.address), [validatedTokens]);

  const balances = useMultipleContractSingleData(
    validatedTokenAddresses,
    ERC20Interface,
    "balanceOf",
    useMemo(() => [address], [address]),
  );

  const anyLoading = useMemo(() => balances.some(callState => callState.loading), [balances]);

  return useMemo(
    () => [
      address && validatedTokens.length > 0
        ? validatedTokens.reduce<{ [tokenAddress: string]: CurrencyAmount<Token> }>((memo, token, i) => {
            const value = balances?.[i]?.result?.[0];

            if (value) {
              memo[token.address] = new CurrencyAmount(token, value);
            }
            return memo;
          }, {})
        : {},
      anyLoading,
    ],
    [address, validatedTokens, anyLoading, balances],
  );
};

export const useTokenBalances = (address?: string, tokens?: (Token | undefined)[]) => {
  return useTokenBalancesWithLoadingIndicator(address, tokens)[0];
};

// get the balance for a single token/account combo
export const useTokenBalance = (account?: string, token?: Token) => {
  const tokenBalances = useTokenBalances(
    account,
    useMemo(() => [token], [token]),
  );
  if (!token) return undefined;

  return tokenBalances[token.address];
};

export const useCurrencyBalances = (account?: string, currencies?: (Currency | undefined)[]) => {
  const tokens = useMemo(
    () => currencies?.filter((currency): currency is Token => currency?.isToken ?? false) ?? [],
    [currencies],
  );

  const { chainId } = useWeb3React();
  const tokenBalances = useTokenBalances(account, tokens);
  const containsETH = useMemo(() => currencies?.some(currency => currency?.isNative) ?? false, [currencies]);
  const ethBalance = useNativeCurrencyBalances(useMemo(() => (containsETH ? [account] : []), [containsETH, account]));

  return useMemo(
    () =>
      currencies?.map(currency => {
        if (!account || !currency || currency.chainId !== chainId) return undefined;
        if (currency.isToken) return tokenBalances[currency.address];
        if (currency.isNative) return ethBalance[account];
        return undefined;
      }) ?? [],
    [account, chainId, currencies, ethBalance, tokenBalances],
  );
};

export const useCurrencyBalance = (account?: string, currency?: Currency) => {
  return useCurrencyBalances(
    account,
    useMemo(() => [currency], [currency]),
  )[0];
};

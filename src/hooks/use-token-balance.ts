import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import { Zero } from "@ethersproject/constants";
import { BigNumber } from "@ethersproject/bignumber";

import { useSingleCallResult } from "./use-multicall";
import { useTokenContract } from "./use-contract";
import { getSimpleRpcProvider } from "utils/web3/simple-rpc";
import { FAST_INTERVAL, NATIVE_ADDRESS } from "configs";

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

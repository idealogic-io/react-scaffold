import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import { Zero } from "@ethersproject/constants";
import { BigNumber } from "@ethersproject/bignumber";

import { useSingleCallResult } from "./multicall";
import { useTokenContract } from "./use-contract";
import { getSimpleRpcProvider } from "utils/web3/simple-rpc";
import { FAST_INTERVAL, NATIVE_ADDRESS } from "configs";
// import { useSWRContract } from "./use-swr-contract";

export const useTokenBalance = (tokenAddress: string): { balance: BigNumber } => {
  const { account } = useWeb3React();

  const tokenContract = useTokenContract(tokenAddress, false);
  const balance = useSingleCallResult(account ? tokenContract : undefined, "balanceOf", [account!]);

  return { balance: balance.result?.[0] || Zero };

  // const contract = useTokenContract(tokenAddress, false);
  // const { data } = useSWRContract(
  //   account
  //     ? {
  //         contract,
  //         methodName: "balanceOf",
  //         params: [account],
  //       }
  //     : null,
  //   {
  //     refreshInterval: FAST_INTERVAL,
  //   },
  // );

  // return {
  //   balance: data ? BigNumber.from(data.toString()) : Zero,
  // };
};

export const useNativeBalance = () => {
  const { account, chainId } = useWeb3React();

  const { data } = useSWR(
    () => `${account}/nativeBalance/${chainId}`,
    async () => {
      if (chainId && account) {
        const simpleRpcProvider = getSimpleRpcProvider(chainId);
        return simpleRpcProvider.getBalance(account);
      }
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

import useSWR from "swr";
import { multicall } from "@wagmi/core";

import type { ContractFunctionConfig } from "viem";
import type { UseMulticallParams } from "./types";

export const useMulticall = <TContracts extends ContractFunctionConfig[], TAllowFailure extends boolean = true>({
  multicallConfig,
  configs,
}: UseMulticallParams<TContracts, TAllowFailure>) => {
  const { refreshInterval = 0, revalidateOnFocus = false } = configs ?? {};

  const { data, isLoading, isValidating, mutate } = useSWR(
    multicallConfig && multicallConfig.contracts.length > 0
      ? [...multicallConfig.contracts, "/executeMulticall"]
      : null,
    async () => {
      return executeMulticall();
    },
    { revalidateOnFocus, refreshInterval },
  );

  const executeMulticall = async () => {
    return await multicall(multicallConfig);
  };

  return {
    data,
    loading: isLoading || isValidating,
    refresh: mutate,
  };
};

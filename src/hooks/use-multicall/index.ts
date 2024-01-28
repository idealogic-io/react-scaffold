/* cSpell:disable */
import useSWR from "swr";
import { multicall } from "@wagmi/core";

import type { ContractFunctionConfig } from "viem";
import type { UseMulticallParams, MulticallResults } from "./types";

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
    const fetchedData = await multicall({
      ...multicallConfig,
      allowFailure: true,
    });

    const resultArray = new Array(multicallConfig.contracts.length).fill(undefined);

    if (
      fetchedData &&
      Array.isArray(fetchedData) &&
      fetchedData.length > 0 &&
      fetchedData.length === resultArray.length
    ) {
      fetchedData.forEach((result, index) => {
        if (result && result.status === "success") {
          resultArray[index] = result.result;
        } else {
          resultArray[index] = undefined;
        }
      });
    }

    return resultArray as MulticallResults<TContracts>;
  };

  return {
    data,
    loading: isLoading || isValidating,
    refresh: mutate,
  };
};

/* cSpell:enable */

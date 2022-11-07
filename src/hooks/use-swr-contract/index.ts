/* eslint-disable no-param-reassign */

import { useMemo } from "react";
import { Contract } from "@ethersproject/contracts";
import useSWR, { SWRConfiguration } from "swr";
import { ContractMethodName, UseSWRContractKey } from "./types";
import { getContractKey, serializesContractKey } from "./helpers";

/**
 * @example
 * const key = [contract, 'methodName', [params]]
 * const key = { contract, methodName, params }
 * const { data, error, mutate } = useSWRContract(key)
 */
export function useSWRContract<
  Error = any,
  T extends Contract = Contract,
  N extends ContractMethodName<T> = ContractMethodName<T>,
  Data = Awaited<ReturnType<T["callStatic"][N]>>,
>(key?: UseSWRContractKey<T, N> | null, config: SWRConfiguration<Data, Error> = {}) {
  const { contract, methodName, params } = getContractKey(key) || {};
  const serializedKeys = useMemo(() => serializesContractKey(key), [key]);

  return useSWR<Data, Error>(
    serializedKeys,
    async () => {
      if (!contract || !methodName) return null;
      if (!params) return contract[methodName]();
      return contract[methodName](...params);
    },
    config,
  );
}

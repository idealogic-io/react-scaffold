import type { MulticallConfig } from "@wagmi/core";
import type { ContractFunctionConfig, ContractFunctionResult, MulticallContract } from "viem";

export type UseMulticallConfig = {
  refreshInterval?: number;
  revalidateOnFocus?: boolean;
};

export type UseMulticallParams<TContracts extends ContractFunctionConfig[], TAllowFailure extends boolean = true> = {
  multicallConfig: MulticallConfig<TContracts, TAllowFailure> | undefined;
  configs?: UseMulticallConfig;
};

/* eslint-disable */
export type MulticallResults<
  TContracts extends readonly MulticallContract<any, any>[],
  Result extends any[] = [],
> = TContracts extends []
  ? []
  : TContracts extends [infer Head extends MulticallContract<any, any>]
  ? [...Result, ContractFunctionResult<Head["abi"], Head["functionName"]> | undefined]
  : TContracts extends [
      infer Head extends MulticallContract<any, any>,
      ...infer Tail extends readonly MulticallContract<any, any>[],
    ]
  ? MulticallResults<Tail, [...Result, ContractFunctionResult<Head["abi"], Head["functionName"]> | undefined]>
  : (ContractFunctionResult[] | undefined)[];
/* eslint-enable */

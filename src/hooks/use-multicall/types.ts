import type { MulticallConfig } from "@wagmi/core";
import type { ContractFunctionConfig } from "viem";

export type UseMulticallConfig = {
  refreshInterval?: number;
  revalidateOnFocus?: boolean;
};

export type UseMulticallParams<TContracts extends ContractFunctionConfig[], TAllowFailure extends boolean = true> = {
  multicallConfig: MulticallConfig<TContracts, TAllowFailure>;
  configs?: UseMulticallConfig;
};

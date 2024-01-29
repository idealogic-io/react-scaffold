import type { UsePrepareContractWriteConfig } from "wagmi";
import type { Abi } from "abitype";

export type UseContractWriteHookConfigs = {
  updateCallback?: () => void;
  successCallback?: () => void;
  errorCallback?: () => void;
};

export type UseContractWriteHookParams<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TChainId extends number,
> = {
  data: UsePrepareContractWriteConfig<TAbi, TFunctionName, TChainId>;
  configs?: UseContractWriteHookConfigs;
};

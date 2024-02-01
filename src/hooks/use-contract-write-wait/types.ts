import type { WaitMode } from "../use-contract-write/types";

export type UseContractWriteWaitData = {
  hash?: `0x${string}`;
  chainId?: number;
  contractAddress?: `0x${string}`;
  methodName?: string;
};

export type UseContractWriteWaitConfigs = {
  loaderController: (arg0: boolean) => void;
  hashUpdate: (arg0: `0x${string}` | undefined) => void;
  waitMode?: WaitMode;
  updateCallback?: () => void;
  successCallback?: () => void;
  errorCallback?: () => void;
};

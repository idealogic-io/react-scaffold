export type WaitMode = "wait" | "wait-timeout" | "global" | "no-wait";

export type UseContractWriteHookConfigs = {
  updateCallback?: () => void;
  successCallback?: () => void;
  errorCallback?: () => void;
  waitMode?: WaitMode;
};

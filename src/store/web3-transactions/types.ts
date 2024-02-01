import type { AllowedChain } from "configs/chains";

export interface TransactionConfigs {
  chainId?: number;
  contractAddress?: string;
  methodName?: string;
}

export interface TransactionDetails {
  hash: `0x${string}`;
  startTimestamp?: number;
  successMessage?: string;
  errorMessage?: string;
  refreshCallback?: () => void;
  successCallback?: () => void;
  errorCallback?: () => void;
  configs?: TransactionConfigs;
}

export interface TransactionsBatch {
  [txHash: string]: TransactionDetails;
}

export type TransactionsState = Partial<{
  [chainId in AllowedChain]: {
    [txHash: string]: TransactionDetails;
  };
}>;

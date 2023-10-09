import { Connection, ConnectionType, WalletError } from "configs/web3";

export type Web3WalletState = {
  connectionType: ConnectionType | undefined;
  connectionStatus: ActivationState;
};

export enum ActivationStatus {
  PENDING,
  ERROR,
  IDLE,
}

export type ActivationPendingState = { status: ActivationStatus.PENDING; connection: Connection };
export type ActivationErrorState = { status: ActivationStatus.ERROR; connection: Connection; error: WalletError };
export const IDLE_ACTIVATION_STATE = { status: ActivationStatus.IDLE } as const;
type ActivationState = ActivationPendingState | ActivationErrorState | typeof IDLE_ACTIVATION_STATE;

import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";
import { WalletConnect } from "@web3-react/walletconnect-v2";

import { toastOptionsError } from "components";

import {
  WalletError,
  isRequestPending,
  isUserReject,
  Connection,
  useSwitchChain,
  MAINNET_CHAIN_IDS,
} from "configs/web3";

import { useAppDispatch, useAppSelector } from "store/store";
import { updateConnectionStatus, updateConnectionType } from "store/web3-wallet";

import {
  ActivationErrorState,
  ActivationPendingState,
  ActivationStatus,
  IDLE_ACTIVATION_STATE,
} from "store/web3-wallet/types";

export const useWeb3Login = () => {
  const { connector } = useWeb3React();
  const dispatch = useAppDispatch();
  const { activateWithChainId } = useSwitchChain();

  const activate = async (connection: Connection, desiredChainId: number = MAINNET_CHAIN_IDS.MAINNET) => {
    // Skips wallet connection if the connection should override the default
    // behavior, i.e. install MetaMask or launch Coinbase app
    if (connection.overrideActivate?.()) {
      return;
    }

    try {
      dispatch(updateConnectionType(undefined));
      dispatch(updateConnectionStatus({ status: ActivationStatus.PENDING, connection }));
      // We can't connect to WalletConnect with other chain than MAINNET.
      // I tried to recreate instance of WalletConnect with new default chain id in overrideActivate but it returns an Error:
      // `The connectors prop passed to Web3ReactProvider must be referentially static. If connectors is changing, try providing a key prop to Web3ReactProvider that changes every time connectors changes.`
      // The other case how to prevent error from WalletConnect is to force activate it with MAINNET
      const targetChainId = connection.connector instanceof WalletConnect ? MAINNET_CHAIN_IDS.MAINNET : desiredChainId;

      await activateWithChainId(connection.connector, targetChainId);

      dispatch(updateConnectionType(connection.type));
      dispatch(updateConnectionStatus(IDLE_ACTIVATION_STATE));
    } catch (error) {
      const err = error as WalletError;
      if (isUserReject(err)) {
        dispatch(updateConnectionStatus(IDLE_ACTIVATION_STATE));
        return;
      }

      if (isRequestPending(err)) {
        toast.error("Please check your external wallet, request is already pending", toastOptionsError);
        dispatch(updateConnectionStatus(IDLE_ACTIVATION_STATE));
        return;
      }

      dispatch(updateConnectionStatus({ status: ActivationStatus.ERROR, connection, error: error as WalletError }));
    }
  };

  const deactivate = async () => {
    if (connector && connector.deactivate) {
      connector.deactivate();
    }
    connector.resetState();

    dispatch(updateConnectionType(undefined));
    dispatch(updateConnectionStatus(IDLE_ACTIVATION_STATE));
  };

  return { deactivate, activate };
};

const useCancelActivation = () => {
  const connectionStatus = useAppSelector(state => state.web3Wallet.connectionStatus);
  const dispatch = useAppDispatch();

  const cancelActivation = () => {
    if (connectionStatus.status !== ActivationStatus.IDLE) {
      (connectionStatus as ActivationPendingState | ActivationErrorState).connection?.connector?.deactivate?.();
      dispatch(updateConnectionType(undefined));
      dispatch(updateConnectionStatus(IDLE_ACTIVATION_STATE));
    }
  };

  return { cancelActivation };
};

export const useActivationState = () => {
  const connectionType = useAppSelector(state => state.web3Wallet.connectionType);
  const connectionStatus = useAppSelector(state => state.web3Wallet.connectionStatus);

  const { cancelActivation } = useCancelActivation();
  const { activate, deactivate } = useWeb3Login();

  return { connectionStatus, connectionType, activate, deactivate, cancelActivation };
};

import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";

import {
  useSwitchChain,
  useQueryChainId,
  WalletError,
  ChainId,
  isUserReject,
  isSupportedChain,
  isRequestPending,
} from "configs/connectors";

import { toastOptionsError } from "components";

export const useSelectChain = () => {
  const { connector } = useWeb3React();
  const { switchChain } = useSwitchChain();
  const { setQueryChainId } = useQueryChainId();

  const selectChain = async (targetChain: ChainId) => {
    if (!connector) return;

    try {
      await switchChain(connector, targetChain);

      if (isSupportedChain(targetChain)) {
        setQueryChainId(targetChain);
      }
    } catch (error) {
      const err = error as WalletError;

      if (isUserReject(err)) {
        return;
      } else if (isRequestPending(err)) {
        toast.error("Please check your external wallet, request is already pending", toastOptionsError);
      } else {
        console.error("Failed to switch networks", error);
        toast.error(
          "Failed to switch networks. Please switch the network in your wallet’s settings.",
          toastOptionsError,
        );
      }
    }
  };

  return { selectChain };
};

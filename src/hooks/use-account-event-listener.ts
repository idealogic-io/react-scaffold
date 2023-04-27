import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { clearUserState } from "./use-web3-login";

type Payload = { chainId?: string; account?: string[] };
/**
 * Is used to listen for events related to wallet
 * @param handleUpdate callback if wallet state is changed
 * @param handleDeactivate callback if user log out from wallet
 */
export const useAccountEventListener = (handleUpdate?: (payload: Payload) => void, handleDeactivate?: () => void) => {
  const { connector } = useWeb3React();

  useEffect(() => {
    if (connector) {
      connector.addListener("Web3ReactUpdate", handleUpdateEvent);
      connector.addListener("Web3ReactDeactivate", handleDeactivateEvent);

      return () => {
        connector.removeListener("Web3ReactUpdate", handleUpdateEvent);
        connector.removeListener("Web3ReactDeactivate", handleDeactivateEvent);
      };
    }
  }, [connector]);

  const handleDeactivateEvent = () => {
    handleDeactivate?.();
    clearUserState();
  };

  const handleUpdateEvent = (payload: Payload) => {
    handleUpdate?.(payload);
  };
};

import { useEffect } from "react";

import { connectorName, injectedConnector } from "utils/web3";
import { LOCAL_STORAGE_KEYS } from "configs";
import { useWeb3Login } from "hooks";

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID as string;
/**
 * Automatically log into wallet where this hook is used
 * @param networkId
 */
const useWeb3AutoConnect = (networkId: number | undefined = +CHAIN_ID) => {
  const { login } = useWeb3Login();
  const connectorId = localStorage.getItem(LOCAL_STORAGE_KEYS.connector);

  useEffect(() => {
    const tryLogin = (_connectorId: string) => {
      setTimeout(() => login(_connectorId as keyof typeof connectorName, networkId));
    };

    if (connectorId && networkId) {
      if (connectorId === connectorName.injectedConnector) {
        injectedConnector()
          .isAuthorized()
          .then(() => tryLogin(connectorId));
      } else {
        tryLogin(connectorId as keyof typeof connectorName);
      }
    }
  }, []);
};

export default useWeb3AutoConnect;

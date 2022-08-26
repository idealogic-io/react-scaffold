import { useEffect } from "react";
import { isMobile } from "react-device-detect";

import { connectorName, injectedConnector } from "utils/web3";
import { LOCAL_STORAGE_KEYS } from "configs";
import { useWeb3Login } from "hooks";

// If you want to setup exact network on mount pass network id
// Otherwise network id will be first from supported chains at login function
const useWeb3AutoConnect = (networkId?: number) => {
  const { login } = useWeb3Login();
  const connectorId = localStorage.getItem(LOCAL_STORAGE_KEYS.connector);

  useEffect(() => {
    const tryLogin = (_connectorId: string) => {
      setTimeout(() => login(_connectorId as keyof typeof connectorName, networkId));
    };

    if (connectorId) {
      if (connectorId === connectorName.injectedConnector) {
        injectedConnector.isAuthorized().then(() => tryLogin(connectorId));
      } else {
        tryLogin(connectorId as keyof typeof connectorName);
      }
    } else {
      injectedConnector.isAuthorized().then(isAuthorized => {
        if (isAuthorized) {
          tryLogin(connectorName.injectedConnector);
        } else {
          if (isMobile && window.ethereum) {
            tryLogin(connectorName.injectedConnector);
          }
        }
      });
    }
  }, []);
};

export default useWeb3AutoConnect;

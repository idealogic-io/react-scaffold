import { useEffect } from "react";
import { isMobile } from "react-device-detect";

import { connectorName, injectedConnector } from "utils/web3";
import { LOCAL_STORAGE_KEYS } from "configs";
import { useWeb3Login } from "hooks";

const getLocalStorageItem = () => {
  try {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.connector);
  } catch (err) {
    console.error(`Local Storage error: ${(err as Error)?.message}`);

    return null;
  }
};

const useWeb3AutoConnect = () => {
  const { login } = useWeb3Login();

  useEffect(() => {
    const tryLogin = (_connectorId: string) => {
      setTimeout(() => login(_connectorId as keyof typeof connectorName));
    };

    const connectorId = getLocalStorageItem();

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
  }, [login]);
};

export default useWeb3AutoConnect;

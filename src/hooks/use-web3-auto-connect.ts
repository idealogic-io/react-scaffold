import { useEffect } from "react";
import { isMobile } from "react-device-detect";

import { ConnectorNames, injectedConnector } from "utils/web3";
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
    const tryLogin = (_connectorId: ConnectorNames) => {
      setTimeout(() => login(_connectorId));
    };

    const connectorId = getLocalStorageItem();

    if (connectorId) {
      if (connectorId === ConnectorNames.Injected) {
        injectedConnector.isAuthorized().then(() => tryLogin(connectorId));
      } else {
        tryLogin(connectorId as ConnectorNames);
      }
    } else {
      injectedConnector.isAuthorized().then(isAuthorized => {
        if (isAuthorized) {
          tryLogin(ConnectorNames.Injected);
        } else {
          if (isMobile && window.ethereum) {
            tryLogin(ConnectorNames.Injected);
          }
        }
      });
    }
  }, [login]);
};

export default useWeb3AutoConnect;

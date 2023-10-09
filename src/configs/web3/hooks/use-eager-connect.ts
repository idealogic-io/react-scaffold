import { Connector } from "@web3-react/types";
import { useEffect } from "react";

import { useAppSelector } from "store/store";
import { getConnection, networkConnection } from "configs/web3";

export const useEagerConnect = () => {
  const { connectionType } = useAppSelector(state => state.web3Wallet);

  const selectedConnection = connectionType && getConnection(connectionType);

  const connect = async (connector: Connector) => {
    try {
      if (connector.connectEagerly) {
        await connector.connectEagerly();
      } else {
        await connector.activate();
      }
    } catch (error) {
      console.error("Eager connection error", error);
    }
  };

  useEffect(() => {
    // Always connect to network
    connect(networkConnection.connector);

    if (selectedConnection) {
      connect(selectedConnection.connector);
    }
  }, []);
};

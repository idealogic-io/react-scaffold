import { getConnection } from "../connections";
import { ConnectionType } from "../types";

const SELECTABLE_WALLETS = [
  ConnectionType.INJECTED,
  ConnectionType.WALLET_CONNECT_V2,
  ConnectionType.COINBASE_WALLET,
  ConnectionType.NETWORK,
];

export const useOrderedConnections = () => {
  return SELECTABLE_WALLETS.map(connectionType => getConnection(connectionType));
};

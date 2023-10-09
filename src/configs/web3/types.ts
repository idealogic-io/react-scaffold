import { Web3ReactHooks } from "@web3-react/core";
import { Connector } from "@web3-react/types";
import { SvgProps } from "components/svg/types";

export type ChainId = number;

export enum ConnectionType {
  INJECTED = "INJECTED",
  COINBASE_WALLET = "COINBASE_WALLET",
  WALLET_CONNECT_V2 = "WALLET_CONNECT_V2",
  NETWORK = "NETWORK",
}

export interface Connection {
  getName(): string;
  connector: Connector;
  hooks: Web3ReactHooks;
  type: ConnectionType;
  getIcon?(): React.FC<SvgProps>;
  shouldDisplay(): boolean;
  overrideActivate?: () => boolean;
}

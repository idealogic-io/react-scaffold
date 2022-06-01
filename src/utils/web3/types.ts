import { SvgProps } from "components/svg/types";
import { ChainId, ConnectorNames } from "./web3-react";

export interface Address {
  [ChainId.Mainnet]: string;
  [ChainId.Testnet]: string;
}

export interface Connector {
  title: string;
  icon: React.FC<SvgProps>;
  connectorId: ConnectorNames;
  href?: string;
}

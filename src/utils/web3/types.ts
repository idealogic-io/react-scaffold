import { SvgProps } from "components/svg/types";
import { ChainId, connectorName } from "./web3-react";

export interface Address {
  [ChainId.Mainnet]: string;
  [ChainId.Testnet]: string;
}

export interface Connector {
  title: string;
  icon: React.FC<SvgProps>;
  connectorId: keyof typeof connectorName;
  href?: string;
}

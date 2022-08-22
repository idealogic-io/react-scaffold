import { SvgProps } from "components/svg/types";
import { connectorName } from "./web3-react";

export interface Connector {
  title: string;
  icon: React.FC<SvgProps>;
  connectorId: string;
  href?: string;
}

import { connectorName } from "utils/web3";
import { SvgProps } from "components/svg/types";

export interface Connector {
  title: string;
  icon: React.FC<SvgProps>;
  connectorId: keyof typeof connectorName;
  href?: string;
}

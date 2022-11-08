import { SvgProps } from "components/svg/types";

export interface Connector {
  title: string;
  icon: React.FC<SvgProps>;
  connectorId: string;
  href?: string;
}

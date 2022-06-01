import Metamask from "components/svg/icons/Metamask";
import WalletConnect from "components/svg/icons/WalletConnect";

import { ConnectorNames } from "utils/web3";
import { Connector } from "utils/web3/types";

const connectors: Connector[] = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: ConnectorNames.Injected,
    href: "https://metamask.app.link/dapp/pancakeswap.finance/",
  },
  {
    title: "WalletConnect",
    icon: WalletConnect,
    connectorId: ConnectorNames.WalletConnect,
  },
];

export default connectors;

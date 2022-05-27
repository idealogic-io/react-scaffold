import Metamask from "components/svg/icons/Metamask";
import WalletConnect from "components/svg/icons/WalletConnect";

import { connectorName } from "utils/web3";

const connectors = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: connectorName.injectedConnector,
    href: "https://metamask.app.link/dapp/pancakeswap.finance/",
  },
  {
    title: "WalletConnect",
    icon: WalletConnect,
    connectorId: connectorName.walletConnect,
  },
];

export default connectors;

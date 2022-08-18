import Metamask from "components/svg/icons/Metamask";
import WalletConnect from "components/svg/icons/WalletConnect";
import CoinBase from "components/svg/icons/CoinBase";

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
  {
    title: "Coinbase Wallet",
    icon: CoinBase,
    connectorId: ConnectorNames.WalletLinkConnector,
  },
];

export default connectors;

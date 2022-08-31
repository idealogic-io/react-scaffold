import Web3 from "components/svg/icons/Web3";
import WalletConnect from "components/svg/icons/WalletConnect";
import CoinBase from "components/svg/icons/CoinBase";

import { connectorName } from "utils/web3";
import { Connector } from "utils/web3/types";

const connectors: Connector[] = [
  {
    title: "Web3",
    icon: Web3,
    connectorId: connectorName.injectedConnector,
  },
  {
    title: "WalletConnect",
    icon: WalletConnect,
    connectorId: connectorName.walletConnect,
  },
  {
    title: "Coinbase Wallet",
    icon: CoinBase,
    connectorId: connectorName.walletLinkConnector,
  },
];

export default connectors;

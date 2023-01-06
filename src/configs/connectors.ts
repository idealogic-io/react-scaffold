import Web3 from "components/svg/icons/Web3";
import WalletConnect from "components/svg/icons/WalletConnect";
import CoinBase from "components/svg/icons/CoinBase";

import { connectorName } from "utils/web3";

const URL = process.env.REACT_APP_URL as string;

const connectors = [
  {
    title: "Web3",
    icon: Web3,
    href: `https://metamask.app.link/dapp/${URL?.replace("https://", "")}/`,
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

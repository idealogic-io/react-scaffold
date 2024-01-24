import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { createConfig } from "wagmi";

import { chains, publicClient } from "configs";

const { connectors } = getDefaultWallets({
  appName: "Scaffold",
  projectId: process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID as string,
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

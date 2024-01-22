import React, { PropsWithChildren } from "react";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

// Import all networks with which the application should work here and add them to configureChains()
import { bscTestnet, polygonMumbai } from "wagmi/chains";

const { chains, publicClient } = configureChains([bscTestnet, polygonMumbai], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "Scaffold",
  projectId: process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID as string,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const Web3Provider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} initialChain={bscTestnet}>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
};

export default Web3Provider;

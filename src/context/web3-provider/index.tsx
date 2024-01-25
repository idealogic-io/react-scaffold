import React, { PropsWithChildren } from "react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";

import { useLogOutWithoutConnection } from "hooks";

import { chains } from "configs/chains";
import { wagmiConfig } from "configs/connectors";

const Web3Listeners: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  useLogOutWithoutConnection();
  return <>{children}</>;
};

const Web3Provider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} initialChain={chains[0]}>
        <Web3Listeners>{children}</Web3Listeners>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Web3Provider;

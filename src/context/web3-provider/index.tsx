import React, { PropsWithChildren } from "react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";

import { chains, wagmiConfig } from "configs";

const Web3Provider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} initialChain={chains[0]}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Web3Provider;

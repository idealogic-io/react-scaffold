import React, { PropsWithChildren } from "react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { useLogOutWithoutConnection } from "hooks";

import { chains } from "configs/chains";
import { wagmiConfig } from "configs/connectors";

const queryClient = new QueryClient();

const Web3Listeners: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  useLogOutWithoutConnection();
  return <>{children}</>;
};

const Web3Provider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider initialChain={chains[0]}>
          <Web3Listeners>{children}</Web3Listeners>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;

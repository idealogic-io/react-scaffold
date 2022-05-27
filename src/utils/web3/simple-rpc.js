import { StaticJsonRpcProvider } from "@ethersproject/providers";

import { chainRpc, getChainId } from "./web3-react";

export const getRpcUrl = () => {
  const chainId = getChainId();
  return chainRpc[chainId];
};

export const simpleRpcProvider = new StaticJsonRpcProvider(getRpcUrl());

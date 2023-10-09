import { CHAINS, ChainId } from "configs/web3";

export const addChainParameters = (chainId: ChainId) => {
  return CHAINS[chainId];
};

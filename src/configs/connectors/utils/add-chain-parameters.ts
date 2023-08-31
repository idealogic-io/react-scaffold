import { CHAINS, ChainId } from "configs/connectors";

export const addChainParameters = (chainId: ChainId) => {
  return CHAINS[chainId];
};

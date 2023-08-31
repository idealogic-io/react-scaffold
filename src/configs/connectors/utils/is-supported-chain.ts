import { SUPPORTED_CHAINS, ChainId } from "configs/connectors";

export const isSupportedChain = (chainId?: ChainId) => {
  return chainId && SUPPORTED_CHAINS.includes(chainId);
};

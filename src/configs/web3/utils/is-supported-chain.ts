import { SUPPORTED_CHAINS, ChainId } from "configs/web3";

export const isSupportedChain = (chainId?: ChainId) => {
  return chainId && SUPPORTED_CHAINS.includes(chainId);
};

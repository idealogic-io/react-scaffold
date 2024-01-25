import { type Chain } from "wagmi";

export const parseAllowedChains = (chainsIds: number[], chains: { [chainName: string]: Chain }) => {
  const wagmiChainsValues = Object.values(chains);

  const allowedChains: Chain[] = [];
  chainsIds.forEach(id => {
    const chain = wagmiChainsValues.find(chain => chain.id === id);
    if (chain) {
      allowedChains.push(chain);
    }
  });

  return allowedChains;
};

import type { Chain } from "@rainbow-me/rainbowkit";

export const parseAllowedChains = (chainsIds: number[], chains: { [chainName: string]: Chain }) => {
  const wagmiChainsValues = Object.values(chains);

  const allowedChains: Chain[] = [];
  chainsIds.forEach(id => {
    const chain = wagmiChainsValues.find(chain => chain.id === id);
    if (chain) {
      allowedChains.push(chain);
    }
  });

  return allowedChains as [Chain, ...Chain[]];
};

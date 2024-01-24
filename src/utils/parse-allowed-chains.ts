import * as wagmiChains from "wagmi/chains";
import { type Chain } from "wagmi";

export const parseAllowedChains = (chainsIds: number[]) => {
  const wagmiChainsValues = Object.values(wagmiChains);

  const allowedChains: Chain[] = [];
  chainsIds.forEach(id => {
    const chain = wagmiChainsValues.find(chain => chain.id === id);
    if (chain) {
      allowedChains.push(chain);
    }
  });

  return allowedChains;
};

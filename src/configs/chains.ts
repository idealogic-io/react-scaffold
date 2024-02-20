import * as wagmiChains from "wagmi/chains";

import { parseAllowedChains } from "utils";

export const CHAINS_IDS = {
  BSC_TEST: wagmiChains.bscTestnet.id,
  POLYGON_TEST: wagmiChains.polygonMumbai.id,
} as const;

export const allowedChainsId = Object.values(CHAINS_IDS);
export const chains = parseAllowedChains(allowedChainsId, wagmiChains);

export type AllowedChain = (typeof allowedChainsId)[number];

// You also can use more simple import of chains:
// import {bsc, mainnet} from "wagmi/chains";
// export const { chains, publicClient } = configureChains([mainnet, bsc], [publicProvider()]);

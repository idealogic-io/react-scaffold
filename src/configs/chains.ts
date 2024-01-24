import { publicProvider } from "wagmi/providers/public";
import { configureChains } from "wagmi";
import { bscTestnet, polygonMumbai } from "wagmi/chains";

import { parseAllowedChains } from "utils";

export type AllowedChain = (typeof allowedChainsId)[number];

export const CHAINS_IDS = {
  BSC_TEST: bscTestnet.id,
  POLYGON_TEST: polygonMumbai.id,
};
export const allowedChainsId = Object.values(CHAINS_IDS);
export const { chains, publicClient } = configureChains(parseAllowedChains(allowedChainsId), [publicProvider()]);

// You also can use more simple import of chains:
// import {bsc, mainnet} from "wagmi/chains";
// export const { chains, publicClient } = configureChains([mainnet, bsc], [publicProvider()]);

import { publicProvider } from "wagmi/providers/public";
import { configureChains } from "wagmi";
import * as wagmiChains from "wagmi/chains";

import { parseAllowedChains } from "utils";

export const CHAINS_IDS = {
  MAINNET: wagmiChains.mainnet.id,
  BSC_TEST: wagmiChains.bscTestnet.id,
  POLYGON_TEST: wagmiChains.polygonMumbai.id,
};
export const allowedChainsId = Object.values(CHAINS_IDS);
export const { chains, publicClient } = configureChains(parseAllowedChains(allowedChainsId, wagmiChains), [
  publicProvider(),
]);

export type AllowedChain = (typeof allowedChainsId)[number];

// You also can use more simple import of chains:
// import {bsc, mainnet} from "wagmi/chains";
// export const { chains, publicClient } = configureChains([mainnet, bsc], [publicProvider()]);

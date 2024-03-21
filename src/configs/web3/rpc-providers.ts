import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { MAINNET_CHAIN_IDS, RPC_URLS, TESTNET_CHAIN_IDS } from "./chains";

export const getStaticRpcProvider = (chainId: number, i = 0) => {
  return new StaticJsonRpcProvider(RPC_URLS[chainId][i], chainId);
};

export const RPC_PROVIDERS = {
  [MAINNET_CHAIN_IDS.MAINNET]: getStaticRpcProvider(MAINNET_CHAIN_IDS.MAINNET),
  [MAINNET_CHAIN_IDS.BSC]: getStaticRpcProvider(MAINNET_CHAIN_IDS.BSC),
  [MAINNET_CHAIN_IDS.POLYGON]: getStaticRpcProvider(MAINNET_CHAIN_IDS.POLYGON),
  [MAINNET_CHAIN_IDS.AVAX]: getStaticRpcProvider(MAINNET_CHAIN_IDS.AVAX),

  [TESTNET_CHAIN_IDS.SEPOLIA]: getStaticRpcProvider(TESTNET_CHAIN_IDS.SEPOLIA),
  [TESTNET_CHAIN_IDS.BSC_TEST]: getStaticRpcProvider(TESTNET_CHAIN_IDS.BSC_TEST),
  [TESTNET_CHAIN_IDS.POLYGON_MUMBAI]: getStaticRpcProvider(TESTNET_CHAIN_IDS.POLYGON_MUMBAI),
  [TESTNET_CHAIN_IDS.FUJI]: getStaticRpcProvider(TESTNET_CHAIN_IDS.FUJI),
};

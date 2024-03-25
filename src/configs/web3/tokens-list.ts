import { MAINNET_CHAIN_IDS, SUPPORTED_CHAINS, TESTNET_CHAIN_IDS } from "./chains";
import { ChainId } from "./types";

const BASE_TOKENS_LIST_URL = <string>process.env.REACT_APP_TOKENS_URL;

const URL_ID_BY_CHAIN_ID_MAINNET = {
  [MAINNET_CHAIN_IDS.MAINNET]: "ethereum",
  [MAINNET_CHAIN_IDS.BSC]: "bsc",
  [MAINNET_CHAIN_IDS.POLYGON]: "polygon",
  [MAINNET_CHAIN_IDS.AVAX]: "avax",
};

const URL_ID_BY_CHAIN_ID_TESTNET = {
  [TESTNET_CHAIN_IDS.SEPOLIA]: "sepolia",
  [TESTNET_CHAIN_IDS.BSC_TEST]: "bsc-test",
  [TESTNET_CHAIN_IDS.POLYGON_MUMBAI]: "polygon-mumbai",
  [TESTNET_CHAIN_IDS.FUJI]: "avax-fuji",
};

const URL_ID_BY_CHAIN_ID = {
  ...URL_ID_BY_CHAIN_ID_MAINNET,
  ...URL_ID_BY_CHAIN_ID_TESTNET,
};

const getTokenListUrlByChain = (chain: ChainId) => {
  const id = URL_ID_BY_CHAIN_ID[chain];

  if (id) {
    return BASE_TOKENS_LIST_URL.replace("%id%", id);
  }
};

const TOKENS_URLS = SUPPORTED_CHAINS.map(chain => getTokenListUrlByChain(chain)).filter((el): el is string => !!el);

export { BASE_TOKENS_LIST_URL, URL_ID_BY_CHAIN_ID, TOKENS_URLS, getTokenListUrlByChain };

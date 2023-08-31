import type { AddEthereumChainParameter } from "@web3-react/types";

export const MAINNET_CHAIN_IDS = {
  MAINNET: 1,
  BSC: 56,
  POLYGON: 137,
  AVAX: 43114,
};

export const TESTNET_CHAIN_IDS = {
  GOERLI: 5,
  BSC_TEST: 97,
  POLYGON_MUMBAI: 80001,
  FUJI: 43113,
};

export const ETH: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
};

export const BNB: AddEthereumChainParameter["nativeCurrency"] = { name: "BNB", symbol: "BNB", decimals: 18 };

export const MATIC: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Matic",
  symbol: "MATIC",
  decimals: 18,
};

export const AVAX: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Avalanche",
  symbol: "AVAX",
  decimals: 18,
};

export const RPC_URLS = {
  [MAINNET_CHAIN_IDS.MAINNET]: "https://rpc.ankr.com/eth",
  [MAINNET_CHAIN_IDS.BSC]: "https://bsc-dataseed.binance.org",
  [MAINNET_CHAIN_IDS.POLYGON]: "https://polygon-rpc.com",
  [MAINNET_CHAIN_IDS.AVAX]: "https://api.avax.network/ext/bc/C/rpc",

  [TESTNET_CHAIN_IDS.GOERLI]: "https://rpc.ankr.com/eth_goerli",
  [TESTNET_CHAIN_IDS.BSC_TEST]: "https://data-seed-prebsc-1-s1.binance.org:8545",
  [TESTNET_CHAIN_IDS.POLYGON_MUMBAI]: "https://rpc-mumbai.maticvigil.com",
  [TESTNET_CHAIN_IDS.FUJI]: "https://api.avax-test.network/ext/bc/C/rpc",
};

export const BLOCK_EXPLORER_URLS = {
  [MAINNET_CHAIN_IDS.MAINNET]: "https://etherscan.io",
  [MAINNET_CHAIN_IDS.BSC]: "https://bscscan.com",
  [MAINNET_CHAIN_IDS.POLYGON]: "https://polygonscan.com",
  [MAINNET_CHAIN_IDS.AVAX]: "https://snowtrace.io",

  [TESTNET_CHAIN_IDS.GOERLI]: "https://goerli.etherscan.io",
  [TESTNET_CHAIN_IDS.BSC_TEST]: "https://testnet.bscscan.com",
  [TESTNET_CHAIN_IDS.POLYGON_MUMBAI]: "https://mumbai.polygonscan.com",
  [TESTNET_CHAIN_IDS.FUJI]: "https://testnet.snowtrace.io",
};

export const CHAIN_NAMES = {
  [MAINNET_CHAIN_IDS.MAINNET]: "Ethereum Mainnet",
  [MAINNET_CHAIN_IDS.BSC]: "Binance Smart Chain Mainnet",
  [MAINNET_CHAIN_IDS.POLYGON]: "Polygon Mainnet",
  [MAINNET_CHAIN_IDS.AVAX]: "Avalanche C-Chain",

  [TESTNET_CHAIN_IDS.GOERLI]: "Goerli Testnet",
  [TESTNET_CHAIN_IDS.BSC_TEST]: "Binance Smart Chain Testnet",
  [TESTNET_CHAIN_IDS.POLYGON_MUMBAI]: "Polygon Mumbai",
  [TESTNET_CHAIN_IDS.FUJI]: "Avalanche Fuji Testnet",
};

type ChainConfig = {
  [chainId: number]: AddEthereumChainParameter;
};

export const MAINNET_CHAINS: ChainConfig = {
  [MAINNET_CHAIN_IDS.MAINNET]: {
    chainId: MAINNET_CHAIN_IDS.MAINNET,
    chainName: CHAIN_NAMES[MAINNET_CHAIN_IDS.MAINNET],
    nativeCurrency: ETH,
    rpcUrls: [RPC_URLS[MAINNET_CHAIN_IDS.MAINNET]],
    blockExplorerUrls: [BLOCK_EXPLORER_URLS[MAINNET_CHAIN_IDS.MAINNET]],
  },

  [MAINNET_CHAIN_IDS.BSC]: {
    chainId: MAINNET_CHAIN_IDS.BSC,
    chainName: CHAIN_NAMES[MAINNET_CHAIN_IDS.BSC],
    nativeCurrency: BNB,
    rpcUrls: [RPC_URLS[MAINNET_CHAIN_IDS.BSC]],
    blockExplorerUrls: [BLOCK_EXPLORER_URLS[MAINNET_CHAIN_IDS.BSC]],
  },

  [MAINNET_CHAIN_IDS.POLYGON]: {
    chainId: MAINNET_CHAIN_IDS.POLYGON,
    chainName: CHAIN_NAMES[MAINNET_CHAIN_IDS.POLYGON],
    nativeCurrency: MATIC,
    rpcUrls: [RPC_URLS[MAINNET_CHAIN_IDS.POLYGON]],
    blockExplorerUrls: [BLOCK_EXPLORER_URLS[MAINNET_CHAIN_IDS.POLYGON]],
  },

  [MAINNET_CHAIN_IDS.AVAX]: {
    chainId: MAINNET_CHAIN_IDS.AVAX,
    chainName: CHAIN_NAMES[MAINNET_CHAIN_IDS.AVAX],
    nativeCurrency: AVAX,
    rpcUrls: [RPC_URLS[MAINNET_CHAIN_IDS.AVAX]],
    blockExplorerUrls: [BLOCK_EXPLORER_URLS[MAINNET_CHAIN_IDS.AVAX]],
  },
};

export const TESTNET_CHAINS: ChainConfig = {
  [TESTNET_CHAIN_IDS.GOERLI]: {
    chainId: TESTNET_CHAIN_IDS.GOERLI,
    chainName: CHAIN_NAMES[TESTNET_CHAIN_IDS.GOERLI],
    nativeCurrency: ETH,
    rpcUrls: [RPC_URLS[TESTNET_CHAIN_IDS.GOERLI]],
    blockExplorerUrls: [BLOCK_EXPLORER_URLS[TESTNET_CHAIN_IDS.GOERLI]],
  },

  [TESTNET_CHAIN_IDS.BSC_TEST]: {
    chainId: TESTNET_CHAIN_IDS.BSC_TEST,
    chainName: CHAIN_NAMES[TESTNET_CHAIN_IDS.BSC_TEST],
    nativeCurrency: BNB,
    rpcUrls: [RPC_URLS[TESTNET_CHAIN_IDS.BSC_TEST]],
    blockExplorerUrls: [BLOCK_EXPLORER_URLS[TESTNET_CHAIN_IDS.BSC_TEST]],
  },

  [TESTNET_CHAIN_IDS.POLYGON_MUMBAI]: {
    chainId: TESTNET_CHAIN_IDS.POLYGON_MUMBAI,
    chainName: CHAIN_NAMES[TESTNET_CHAIN_IDS.POLYGON_MUMBAI],
    nativeCurrency: MATIC,
    rpcUrls: [RPC_URLS[TESTNET_CHAIN_IDS.POLYGON_MUMBAI]],
    blockExplorerUrls: [BLOCK_EXPLORER_URLS[TESTNET_CHAIN_IDS.POLYGON_MUMBAI]],
  },

  [TESTNET_CHAIN_IDS.FUJI]: {
    chainId: TESTNET_CHAIN_IDS.FUJI,
    chainName: CHAIN_NAMES[TESTNET_CHAIN_IDS.FUJI],
    nativeCurrency: AVAX,
    rpcUrls: [RPC_URLS[TESTNET_CHAIN_IDS.FUJI]],
    blockExplorerUrls: [BLOCK_EXPLORER_URLS[TESTNET_CHAIN_IDS.FUJI]],
  },
};

export const CHAINS = {
  ...MAINNET_CHAINS,
  ...TESTNET_CHAINS,
};

export const CHAIN_IDS_MAINNET = Object.values(MAINNET_CHAIN_IDS);
export const CHAIN_IDS_TESTNET = Object.values(TESTNET_CHAIN_IDS);

export const SUPPORTED_CHAINS = [...CHAIN_IDS_MAINNET, ...CHAIN_IDS_TESTNET];

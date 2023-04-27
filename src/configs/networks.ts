const chainIdMainnet = {
  mainnet: 1,
  bsc: 56,
  polygon: 137,
  avax: 43114,
};

const chainIdTestnet = {
  goerli: 5,
  bscTest: 97,
  polygonMumbai: 80001,
  fuji: 43113,
};

const getChainIds = () => {
  // return process.env.NODE_ENV === "production" ? Object.values(chainIdMainnet) : Object.values(chainIdTestnet);
  return [...Object.values(chainIdTestnet), ...Object.values(chainIdMainnet)];
  // return Object.values(chainIdMainnet);
};

const rpcUrls = {
  // Main
  [chainIdMainnet.mainnet]: "https://rpc.ankr.com/eth",
  [chainIdMainnet.bsc]: "https://bsc-dataseed.binance.org",
  [chainIdMainnet.polygon]: "https://polygon-rpc.com",
  [chainIdMainnet.avax]: "https://api.avax.network/ext/bc/C/rpc",
  // Test
  [chainIdTestnet.goerli]: "https://rpc.ankr.com/eth_goerli",
  [chainIdTestnet.bscTest]: "https://data-seed-prebsc-1-s1.binance.org:8545",
  [chainIdTestnet.polygonMumbai]: "https://rpc-mumbai.maticvigil.com",
  [chainIdTestnet.fuji]: "https://api.avax-test.network/ext/bc/C/rpc",
};

const blockExplorersUrls = {
  // Main
  [chainIdMainnet.mainnet]: "https://etherscan.io",
  [chainIdMainnet.bsc]: "https://bscscan.com",
  [chainIdMainnet.polygon]: "https://polygonscan.com",
  [chainIdMainnet.avax]: "https://snowtrace.io",
  // Test
  [chainIdTestnet.goerli]: "https://goerli.etherscan.io",
  [chainIdTestnet.bscTest]: "https://testnet.bscscan.com",
  [chainIdTestnet.polygonMumbai]: "https://mumbai.polygonscan.com",
  [chainIdTestnet.fuji]: "https://testnet.snowtrace.io",
};

const chainNames = {
  // Main
  [chainIdMainnet.mainnet]: "Ethereum Mainnet",
  [chainIdMainnet.bsc]: "Binance Smart Chain Mainnet",
  [chainIdMainnet.polygon]: "Polygon Mainnet",
  [chainIdMainnet.avax]: "Avalanche C-Chain",
  // Test
  [chainIdTestnet.goerli]: "Goerli Testnet",
  [chainIdTestnet.bscTest]: "Binance Smart Chain Testnet",
  [chainIdTestnet.polygonMumbai]: "Polygon Mumbai",
  [chainIdTestnet.fuji]: "Avalanche Fuji Testnet",
};

const nativeCurrencies = {
  // Main
  [chainIdMainnet.mainnet]: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  [chainIdMainnet.bsc]: { name: "BNB", symbol: "BNB", decimals: 18 },
  [chainIdMainnet.polygon]: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
  },
  [chainIdMainnet.avax]: {
    name: "Avalanche",
    symbol: "AVAX",
    decimals: 18,
  },
  // Test
  [chainIdTestnet.goerli]: {
    name: "Goerli Ether",
    symbol: "GoerliETH",
    decimals: 18,
  },
  [chainIdTestnet.bscTest]: { name: "BNB", symbol: "BNB", decimals: 18 },
  [chainIdTestnet.polygonMumbai]: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
  },
  [chainIdTestnet.fuji]: {
    name: "Avalanche",
    symbol: "AVAX",
    decimals: 18,
  },
};

const networks = {
  // ETH
  [chainIdMainnet.mainnet]: {
    chainId: chainIdMainnet.mainnet,
    chainName: chainNames[chainIdMainnet.mainnet],
    nativeCurrency: nativeCurrencies[chainIdMainnet.mainnet],
    rpcUrls: [rpcUrls[chainIdMainnet.mainnet]],
    blockExplorerUrls: [blockExplorersUrls[chainIdMainnet.mainnet]],
  },
  [chainIdTestnet.goerli]: {
    chainId: chainIdTestnet.goerli,
    chainName: chainNames[chainIdTestnet.goerli],
    nativeCurrency: nativeCurrencies[chainIdTestnet.goerli],
    rpcUrls: [rpcUrls[chainIdTestnet.goerli]],
    blockExplorerUrls: [blockExplorersUrls[chainIdTestnet.goerli]],
  },
  // BSC
  [chainIdMainnet.bsc]: {
    chainId: chainIdMainnet.bsc,
    chainName: chainNames[chainIdMainnet.bsc],
    nativeCurrency: nativeCurrencies[chainIdMainnet.bsc],
    rpcUrls: [rpcUrls[chainIdMainnet.bsc]],
    blockExplorerUrls: [blockExplorersUrls[chainIdMainnet.bsc]],
  },
  [chainIdTestnet.bscTest]: {
    chainId: chainIdTestnet.bscTest,
    chainName: chainNames[chainIdTestnet.bscTest],
    nativeCurrency: nativeCurrencies[chainIdTestnet.bscTest],
    rpcUrls: [rpcUrls[chainIdTestnet.bscTest]],
    blockExplorerUrls: [blockExplorersUrls[chainIdTestnet.bscTest]],
  },
  // Polygon
  [chainIdMainnet.polygon]: {
    chainId: chainIdMainnet.polygon,
    chainName: chainNames[chainIdMainnet.polygon],
    nativeCurrency: nativeCurrencies[chainIdMainnet.polygon],
    rpcUrls: [rpcUrls[chainIdMainnet.polygon]],
    blockExplorerUrls: [blockExplorersUrls[chainIdMainnet.polygon]],
  },
  [chainIdTestnet.polygonMumbai]: {
    chainId: chainIdTestnet.polygonMumbai,
    chainName: chainNames[chainIdTestnet.polygonMumbai],
    nativeCurrency: nativeCurrencies[chainIdTestnet.polygonMumbai],
    rpcUrls: [rpcUrls[chainIdTestnet.polygonMumbai]],
    blockExplorerUrls: [blockExplorersUrls[chainIdTestnet.polygonMumbai]],
  },
  // AVAX
  [chainIdMainnet.avax]: {
    chainId: chainIdMainnet.avax,
    chainName: chainNames[chainIdMainnet.avax],
    nativeCurrency: nativeCurrencies[chainIdMainnet.avax],
    rpcUrls: [rpcUrls[chainIdMainnet.avax]],
    blockExplorerUrls: [blockExplorersUrls[chainIdMainnet.avax]],
  },
  [chainIdTestnet.fuji]: {
    chainId: chainIdTestnet.fuji,
    chainName: chainNames[chainIdTestnet.fuji],
    nativeCurrency: nativeCurrencies[chainIdTestnet.fuji],
    rpcUrls: [rpcUrls[chainIdTestnet.fuji]],
    blockExplorerUrls: [blockExplorersUrls[chainIdTestnet.fuji]],
  },
};

export {
  chainIdMainnet,
  chainIdTestnet,
  rpcUrls,
  blockExplorersUrls,
  chainNames,
  nativeCurrencies,
  networks,
  getChainIds,
};

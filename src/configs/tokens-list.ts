// Configs
import { chainIdMainnet, chainIdTestnet } from "configs";
// Utils
import { NATIVE_ADDRESS } from "utils/web3";
import { sortTokensObjInAlphabeticOrder } from "utils/helpers";

import { Token } from "types/token";

export const mainnetTokens = {
  ETH: new Token(chainIdMainnet.mainnet, NATIVE_ADDRESS, 18, "ETH", "Ether"),
  //  Wrapped
  WETH: new Token(chainIdMainnet.mainnet, "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", 18, "WETH", "Wrapped Ether"),
  WMATIC: new Token(chainIdMainnet.mainnet, "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0", 18, "MATIC", "Matic Token"),
  WBTC: new Token(chainIdMainnet.mainnet, "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", 8, "WBTC", "Wrapped BTC"),
  WXRP: new Token(chainIdMainnet.mainnet, "0x39fBBABf11738317a448031930706cd3e612e1B9", 18, "WXRP", "Wrapped XRP"),
  // Tokens
  BUSD: new Token(chainIdMainnet.mainnet, "0x4Fabb145d64652a948d72533023f6E7A623C7C53", 18, "BUSD", "Binance USD"),
  EUROC: new Token(chainIdMainnet.mainnet, "0x1aBaEA1f7C830bD89Acc67eC4af516284b1bC33c", 6, "EUROC", "Euro Coin"),
  PAX: new Token(chainIdMainnet.mainnet, "0x8E870D67F660D95d5be530380D0eC0bd388289E1", 18, "USDP", "Pax Dollar"),
  TUSD: new Token(chainIdMainnet.mainnet, "0x0000000000085d4780b73119b644ae5ecd22b376", 18, "TUSD", "TrueUSD"),
  USDC: new Token(chainIdMainnet.mainnet, "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", 6, "USDC", "USD Coin"),
  USDT: new Token(chainIdMainnet.mainnet, "0xdAC17F958D2ee523a2206206994597C13D831ec7", 6, "USDT", "Tether USD"),
};

export const bscTokens = {
  BNB: new Token(chainIdMainnet.bsc, NATIVE_ADDRESS, 18, "BNB", "BNB"),
  //  Wrapped
  WETH: new Token(chainIdMainnet.bsc, "0x2170Ed0880ac9A755fd29B2688956BD959F933F8", 18, "ETH", "Ethereum Token"),
  WBNB: new Token(chainIdMainnet.bsc, "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", 18, "WBNB", "Wrapped BNB"),
  WMATIC: new Token(chainIdMainnet.bsc, "0xCC42724C6683B7E57334c4E856f4c9965ED682bD", 18, "MATIC", "Matic Token"),
  WAVAX: new Token(chainIdMainnet.bsc, "0x1CE0c2827e2eF14D5C4f29a091d735A204794041", 18, "AVAX", "Avalanche"),
  WBTC: new Token(chainIdMainnet.bsc, "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c", 18, "BTCB", "BTCB Token"),
  WXRP: new Token(chainIdMainnet.bsc, "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE", 18, "XRP", "XRP Token"),
  // Tokens
  BUSD: new Token(chainIdMainnet.bsc, "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", 18, "BUSD", "Binance USD"),
  PAX: new Token(chainIdMainnet.bsc, "0xb3c11196A4f3b1da7c23d9FB0A3dDE9c6340934F", 18, "PAX", "Paxos Standard"),
  TUSD: new Token(chainIdMainnet.bsc, "0x14016e85a25aeb13065688cafb43044c2ef86784", 18, "TUSD", "TrueUSD"),
  USDC: new Token(chainIdMainnet.bsc, "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", 18, "USDC", "USD Coin"),
  USDT: new Token(chainIdMainnet.bsc, "0x55d398326f99059fF775485246999027B3197955", 18, "USDT", "Tether USD"),
};

export const polygonTokens = {
  MATIC: new Token(chainIdMainnet.polygon, NATIVE_ADDRESS, 18, "MATIC", "MATIC"),
  //  Wrapped
  WETH: new Token(chainIdMainnet.polygon, "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619", 18, "WETH", "Wrapped Ether"),
  WBNB: new Token(chainIdMainnet.polygon, "0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3", 18, "BNB", "BNB (PoS)"),
  WMATIC: new Token(
    chainIdMainnet.polygon,
    "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    18,
    "WMATIC",
    "Wrapped Matic",
  ),
  WAVAX: new Token(chainIdMainnet.polygon, "0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b", 18, "AVAX", "Avalanche Token"),
  WBTC: new Token(chainIdMainnet.polygon, "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6", 8, "WBTC", "(PoS) Wrapped BTC"),
  // Tokens
  BUSD: new Token(chainIdMainnet.polygon, "0x9c9e5fd8bbc25984b178fdce6117defa39d2db39", 18, "BUSD", "BUSD Token"),
  TUSD: new Token(chainIdMainnet.polygon, "0x2e1ad108ff1d8c782fcbbb89aad783ac49586756", 18, "TUSD", "TrueUSD (PoS)"),
  USDC: new Token(chainIdMainnet.polygon, "0x2791bca1f2de4661ed88a30c99a7a9449aa84174", 6, "USDC", "USD Coin (PoS)"),
  USDT: new Token(chainIdMainnet.polygon, "0xc2132d05d31c914a87c6611c10748aeb04b58e8f", 6, "USDT", "(PoS) Tether USD"),
};

export const avaxTokens = {
  AVAX: new Token(chainIdMainnet.avax, NATIVE_ADDRESS, 18, "AVAX", "Avalanche"),
  //  Wrapped
  WETH: new Token(chainIdMainnet.avax, "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB", 18, "WETH.e", "Wrapped Ether"),
  WAVAX: new Token(chainIdMainnet.avax, "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7", 18, "WAVAX", "Wrapped AVAX"),
  WBTC: new Token(chainIdMainnet.avax, "0x50b7545627a5162f82a992c33b87adc75187b218", 8, "WBTC.e", "Wrapped BTC"),
  // Tokens
  BUSD: new Token(chainIdMainnet.avax, "0x9c9e5fd8bbc25984b178fdce6117defa39d2db39", 18, "BUSD.e", "Binance USD"),
  TUSD: new Token(chainIdMainnet.avax, "0x1c20e891bab6b1727d14da358fae2984ed9b59eb", 18, "TUSD", "TrueUSD"),
  USDC: new Token(chainIdMainnet.avax, "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e", 6, "USDC", "USD Coin"),
  USDT: new Token(chainIdMainnet.avax, "0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7", 6, "USDt", "TetherToken"),
};

export const goerliTestnetTokens = {
  ETH: new Token(chainIdTestnet.goerli, NATIVE_ADDRESS, 18, "GoerliETH", "Goerli Ether"),
  USDC: new Token(chainIdTestnet.goerli, "0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C", 6, "USDC", "USD Coin"),
};

export const bscTestnetTokens = {
  BNB: new Token(chainIdTestnet.bscTest, NATIVE_ADDRESS, 18, "BNB", "BNB"),
  BUSD: new Token(chainIdTestnet.bscTest, "0x8516Fc284AEEaa0374E66037BD2309349FF728eA", 18, "BUSD", "Binance USD"),
};

export const polygonMumbaiTokens = {
  MATIC: new Token(chainIdTestnet.polygonMumbai, NATIVE_ADDRESS, 18, "MATIC", "MATIC"),
};

export const fujiTokens = {
  AVAX: new Token(chainIdTestnet.fuji, NATIVE_ADDRESS, 18, "AVAX", "Avalanche"),
};

export const tokensList = {
  [chainIdMainnet.mainnet]: sortTokensObjInAlphabeticOrder(mainnetTokens),
  [chainIdMainnet.bsc]: sortTokensObjInAlphabeticOrder(bscTokens),
  [chainIdMainnet.polygon]: sortTokensObjInAlphabeticOrder(polygonTokens),
  [chainIdMainnet.avax]: sortTokensObjInAlphabeticOrder(avaxTokens),

  [chainIdTestnet.goerli]: sortTokensObjInAlphabeticOrder(goerliTestnetTokens),
  [chainIdTestnet.bscTest]: sortTokensObjInAlphabeticOrder(bscTestnetTokens),
  [chainIdTestnet.polygonMumbai]: sortTokensObjInAlphabeticOrder(polygonMumbaiTokens),
  [chainIdTestnet.fuji]: sortTokensObjInAlphabeticOrder(fujiTokens),
};

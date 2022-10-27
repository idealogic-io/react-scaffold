import { Token } from "@pancakeswap/sdk";
import { NATIVE_ADDRESS } from "./constants";
import { chainIdMainnet, chainIdTestnet } from "./networks";

export const mainnetTokens = {
  eth: new Token(chainIdMainnet.mainnet, NATIVE_ADDRESS, 18, "ETH", "Ether"),
  usdt: new Token(chainIdMainnet.mainnet, "0xdAC17F958D2ee523a2206206994597C13D831ec7", 6, "USDT", "Tether USD"),
  tusd: new Token(chainIdMainnet.mainnet, "0x0000000000085d4780B73119b644AE5ecd22b376", 18, "TUSD", "TrueUSD"),
  usdc: new Token(chainIdMainnet.mainnet, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", 6, "USDC", "USD Coin"),
  busd: new Token(chainIdMainnet.mainnet, "0x4Fabb145d64652a948d72533023f6E7A623C7C53", 18, "BUSD", "Binance USD"),
  euroc: new Token(chainIdMainnet.mainnet, "0x1aBaEA1f7C830bD89Acc67eC4af516284b1bC33c", 6, "EUROC", "Euro Coin"),
  wbtc: new Token(chainIdMainnet.mainnet, "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", 8, "WBTC", "Wrapped BTC"),
  matic: new Token(chainIdMainnet.mainnet, "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0", 18, "MATIC", "Matic Token"),
  usdp: new Token(chainIdMainnet.mainnet, "0x8E870D67F660D95d5be530380D0eC0bd388289E1", 18, "USDP", "Pax Dollar"),
  xrp: new Token(chainIdMainnet.mainnet, "0x39fBBABf11738317a448031930706cd3e612e1B9", 18, "WXRP", "Wrapped XRP"),
};

export const bscTokens = {
  bnb: new Token(chainIdMainnet.bsc, NATIVE_ADDRESS, 18, "BNB", "BNB"),
  usdt: new Token(chainIdMainnet.bsc, "0x55d398326f99059fF775485246999027B3197955", 18, "USDT", "Tether USD"),
  tusd: new Token(chainIdMainnet.bsc, "0x14016E85a25aeb13065688cAFB43044C2ef86784", 18, "TUSD", "TrueUSD"),
  usdc: new Token(chainIdMainnet.bsc, "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", 18, "USDC", "USD Coin"),
  busd: new Token(chainIdMainnet.bsc, "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", 18, "BUSD", "Binance USD"),
  wbtc: new Token(chainIdMainnet.bsc, "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c", 18, "BTCB", "BTCB Token"),
  weth: new Token(chainIdMainnet.bsc, "0x2170Ed0880ac9A755fd29B2688956BD959F933F8", 18, "ETH", "Ethereum Token"),
  matic: new Token(chainIdMainnet.bsc, "0xCC42724C6683B7E57334c4E856f4c9965ED682bD", 18, "MATIC", "Matic Token"),
  usdp: new Token(chainIdMainnet.bsc, "0xb7F8Cd00C5A06c0537E2aBfF0b58033d02e5E094", 18, "PAX", "Paxos Standard"),
  xrp: new Token(chainIdMainnet.bsc, "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE", 18, "XRP", "XRP Token"),
};

export const polygonTokens = {
  matic: new Token(chainIdMainnet.polygon, NATIVE_ADDRESS, 18, "MATIC", "MATIC"),
  usdt: new Token(chainIdMainnet.polygon, "0xc2132d05d31c914a87c6611c10748aeb04b58e8f", 6, "USDT", "(PoS) Tether USD"),
  tusd: new Token(chainIdMainnet.polygon, "0x2e1ad108ff1d8c782fcbbb89aad783ac49586756", 18, "TUSD", "TrueUSD (PoS)"),
  usdc: new Token(chainIdMainnet.polygon, "0x2791bca1f2de4661ed88a30c99a7a9449aa84174", 6, "USDC", "USD Coin (PoS)"),
  wbtc: new Token(chainIdMainnet.polygon, "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6", 8, "WBTC", "(PoS) Wrapped BTC"),
  weth: new Token(chainIdMainnet.polygon, "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619", 18, "WETH", "Wrapped Ether"),
  avax: new Token(chainIdMainnet.polygon, "0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b", 18, "AVAX", "Avalanche Token"),
};

export const avaxTokens = {
  avax: new Token(chainIdMainnet.avax, NATIVE_ADDRESS, 18, "AVAX", "Avalanche"),
  usdt: new Token(chainIdMainnet.avax, "0xc7198437980c041c805a1edcba50c1ce5db95118", 6, "USDT.e", "Tether USD"),
  tusd: new Token(chainIdMainnet.avax, "0x1c20e891bab6b1727d14da358fae2984ed9b59eb", 18, "TUSD", "TrueUSD"),
  usdc: new Token(chainIdMainnet.avax, "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e", 6, "USDC", "USD Coin"),
  busd: new Token(chainIdMainnet.avax, "0x19860ccb0a68fd4213ab9d8266f7bbf05a8dde98", 18, "BUSD.e", "Binance USD"),
  wbtc: new Token(chainIdMainnet.avax, "0x50b7545627a5162f82a992c33b87adc75187b218", 8, "WBTC.e", "Wrapped BTC"),
  weth: new Token(chainIdMainnet.avax, "0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab", 18, "WETH.e", "Wrapped Ether"),
};

export const goerliTestnetTokens = {
  eth: new Token(chainIdTestnet.goerli, NATIVE_ADDRESS, 18, "GoerliETH", "Goerli Ether"),
};

export const bscTestnetTokens = {
  bnb: new Token(chainIdTestnet.bscTest, NATIVE_ADDRESS, 18, "BNB", "BNB"),
  busd: new Token(chainIdTestnet.bscTest, "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee", 18, "BUSD", "Binance USD"),
};

export const polygonMumbaiTokens = {
  matic: new Token(chainIdTestnet.polygonMumbai, NATIVE_ADDRESS, 18, "MATIC", "MATIC"),
  usdt: new Token(chainIdTestnet.polygonMumbai, "0x7f0fa9f1e8cd9342136235c56c23f1029e68e79c", 6, "USDT", "Tether USD"),
};

export const fujiTokens = {
  avax: new Token(chainIdTestnet.fuji, NATIVE_ADDRESS, 18, "AVAX", "Avalanche"),
};

export const tokensList = {
  [chainIdMainnet.mainnet]: mainnetTokens,
  [chainIdMainnet.bsc]: bscTokens,
  [chainIdMainnet.polygon]: polygonTokens,
  [chainIdMainnet.avax]: avaxTokens,

  [chainIdTestnet.goerli]: goerliTestnetTokens,
  [chainIdTestnet.bscTest]: bscTestnetTokens,
  [chainIdTestnet.polygonMumbai]: polygonMumbaiTokens,
  [chainIdTestnet.fuji]: fujiTokens,
};

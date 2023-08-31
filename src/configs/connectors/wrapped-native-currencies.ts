import { MAINNET_CHAIN_IDS, TESTNET_CHAIN_IDS } from "./chains";
import { Token, WETH9 } from "./entities";

export const WRAPPED_NATIVE_CURRENCY = {
  ...WETH9,
  [MAINNET_CHAIN_IDS.POLYGON]: new Token(
    MAINNET_CHAIN_IDS.POLYGON,
    "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    18,
    "WMATIC",
    "Wrapped MATIC",
  ),
  [TESTNET_CHAIN_IDS.POLYGON_MUMBAI]: new Token(
    TESTNET_CHAIN_IDS.POLYGON_MUMBAI,
    "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
    18,
    "WMATIC",
    "Wrapped MATIC",
  ),
  [MAINNET_CHAIN_IDS.BSC]: new Token(
    MAINNET_CHAIN_IDS.BSC,
    "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    18,
    "WBNB",
    "Wrapped BNB",
  ),
  [TESTNET_CHAIN_IDS.BSC_TEST]: new Token(
    TESTNET_CHAIN_IDS.BSC_TEST,
    "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    18,
    "WBNB",
    "Wrapped BNB",
  ),
  [MAINNET_CHAIN_IDS.AVAX]: new Token(
    MAINNET_CHAIN_IDS.AVAX,
    "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    18,
    "WAVAX",
    "Wrapped AVAX",
  ),
  [TESTNET_CHAIN_IDS.FUJI]: new Token(
    TESTNET_CHAIN_IDS.FUJI,
    "0xd00ae08403B9bbb9124bB305C09058E32C39A48c",
    18,
    "WAVAX",
    "Wrapped AVAX",
  ),
};

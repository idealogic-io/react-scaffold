import { chainIdMainnet, chainIdTestnet } from "./networks";
// To check amount of token that user has
// You should call contract with desired address
// And call async method balanceOf
// If token address is nullable address (like ETH mainnet)
// we should check balance with library.getBalance(account);
// Use name and symbol from native token in networks
// If token address is empty this means that it's not presented at the current network
// You can get token name and symbol when call contract method name and symbol
const tokens = {
  USDT: {
    [chainIdMainnet.mainnet]: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    [chainIdMainnet.bsc]: "0x55d398326f99059ff775485246999027b3197955",
    [chainIdMainnet.polygon]: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    [chainIdMainnet.avax]: "0xc7198437980c041c805a1edcba50c1ce5db95118",
    // Test
    [chainIdTestnet.goerli]: "",
    [chainIdTestnet.bscTest]: "",
    [chainIdTestnet.polygonMumbai]: "0x7f0fa9f1e8cd9342136235c56c23f1029e68e79c",
    [chainIdTestnet.fuji]: "",
  },
  TUSD: {
    [chainIdMainnet.mainnet]: "0x0000000000085d4780b73119b644ae5ecd22b376",
    [chainIdMainnet.bsc]: "0x14016e85a25aeb13065688cafb43044c2ef86784",
    [chainIdMainnet.polygon]: "0x2e1ad108ff1d8c782fcbbb89aad783ac49586756",
    [chainIdMainnet.avax]: "0x1c20e891bab6b1727d14da358fae2984ed9b59eb",
    // Test
    [chainIdTestnet.goerli]: "",
    [chainIdTestnet.bscTest]: "",
    [chainIdTestnet.polygonMumbai]: "",
    [chainIdTestnet.fuji]: "",
  },
  USDC: {
    [chainIdMainnet.mainnet]: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    [chainIdMainnet.bsc]: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    [chainIdMainnet.polygon]: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    [chainIdMainnet.avax]: "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e",
    // Test
    [chainIdTestnet.goerli]: "",
    [chainIdTestnet.bscTest]: "",
    [chainIdTestnet.polygonMumbai]: "",
    [chainIdTestnet.fuji]: "",
  },
  BUSD: {
    [chainIdMainnet.mainnet]: "0x4fabb145d64652a948d72533023f6e7a623c7c53",
    [chainIdMainnet.bsc]: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    [chainIdMainnet.polygon]: "",
    [chainIdMainnet.avax]: "0x19860ccb0a68fd4213ab9d8266f7bbf05a8dde98",
    // Test
    [chainIdTestnet.goerli]: "",
    [chainIdTestnet.bscTest]: "",
    [chainIdTestnet.polygonMumbai]: "",
    [chainIdTestnet.fuji]: "",
  },
  EUROC: {
    [chainIdMainnet.mainnet]: "0x1abaea1f7c830bd89acc67ec4af516284b1bc33c",
    [chainIdMainnet.bsc]: "",
    [chainIdMainnet.polygon]: "",
    [chainIdMainnet.avax]: "",
    // Test
    [chainIdTestnet.goerli]: "",
    [chainIdTestnet.bscTest]: "",
    [chainIdTestnet.polygonMumbai]: "",
    [chainIdTestnet.fuji]: "",
  },
  BTC: {
    [chainIdMainnet.mainnet]: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    [chainIdMainnet.bsc]: "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c",
    [chainIdMainnet.polygon]: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
    [chainIdMainnet.avax]: "0x50b7545627a5162f82a992c33b87adc75187b218",
    // Test
    [chainIdTestnet.goerli]: "",
    [chainIdTestnet.bscTest]: "",
    [chainIdTestnet.polygonMumbai]: "",
    [chainIdTestnet.fuji]: "",
  },
  ETH: {
    [chainIdMainnet.mainnet]: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    [chainIdMainnet.bsc]: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    [chainIdMainnet.polygon]: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    [chainIdMainnet.avax]: "0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab",
    // Test
    [chainIdTestnet.goerli]: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    [chainIdTestnet.bscTest]: "",
    [chainIdTestnet.polygonMumbai]: "",
    [chainIdTestnet.fuji]: "",
  },
  BNB: {
    [chainIdMainnet.mainnet]: "",
    [chainIdMainnet.bsc]: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    [chainIdMainnet.polygon]: "",
    [chainIdMainnet.avax]: "",
    // Test
    [chainIdTestnet.goerli]: "",
    [chainIdTestnet.bscTest]: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    [chainIdTestnet.polygonMumbai]: "",
    [chainIdTestnet.fuji]: "",
  },
  AVAX: {
    [chainIdMainnet.mainnet]: "",
    [chainIdMainnet.bsc]: "",
    [chainIdMainnet.polygon]: "0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
    [chainIdMainnet.avax]: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    // Test
    [chainIdTestnet.goerli]: "",
    [chainIdTestnet.bscTest]: "",
    [chainIdTestnet.polygonMumbai]: "",
    [chainIdTestnet.fuji]: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  },
  USDP: {
    [chainIdMainnet.mainnet]: "0x8E870D67F660D95d5be530380D0eC0bd388289E1",
    [chainIdMainnet.bsc]: "0xb7f8cd00c5a06c0537e2abff0b58033d02e5e094",
    [chainIdMainnet.polygon]: "",
    [chainIdMainnet.avax]: "",
    // Test
    [chainIdTestnet.goerli]: "",
    [chainIdTestnet.bscTest]: "",
    [chainIdTestnet.polygonMumbai]: "",
    [chainIdTestnet.fuji]: "",
  },
  XRP: {
    [chainIdMainnet.mainnet]: "0x39fbbabf11738317a448031930706cd3e612e1b9",
    [chainIdMainnet.bsc]: "0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe",
    [chainIdMainnet.polygon]: "",
    [chainIdMainnet.avax]: "",
    // Test
    [chainIdTestnet.goerli]: "",
    [chainIdTestnet.bscTest]: "",
    [chainIdTestnet.polygonMumbai]: "",
    [chainIdTestnet.fuji]: "",
  },
};

export { tokens };

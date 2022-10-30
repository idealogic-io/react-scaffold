import { chainIdMainnet, chainIdTestnet } from "configs/networks";

const contractsAddresses = {
  multicall: {
    [chainIdMainnet.mainnet]: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
    [chainIdTestnet.goerli]: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",

    [chainIdMainnet.bsc]: "0xC50F4c1E81c873B2204D7eFf7069Ffec6Fbe136D",
    [chainIdTestnet.bscTest]: "0x73CCde5acdb9980f54BcCc0483B28B8b4a537b4A",

    [chainIdMainnet.polygon]: "0x275617327c958bD06b5D6b871E7f491D76113dd8",
    [chainIdTestnet.polygonMumbai]: "0xe9939e7Ea7D7fb619Ac57f648Da7B1D425832631",

    [chainIdMainnet.avax]: "0xed386Fe855C1EFf2f843B910923Dd8846E45C5A4",
    [chainIdTestnet.fuji]: "0x3D015943d2780fE97FE3f69C97edA2CCC094f78c",
  },
};

export default contractsAddresses;

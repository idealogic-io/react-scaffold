import { chainIdMainnet, chainIdTestnet } from "configs/networks";

const contractsAddresses = {
  multicall: {
    [chainIdMainnet.mainnet]: "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
    [chainIdTestnet.goerli]: "",

    [chainIdMainnet.bsc]: "0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B",
    [chainIdTestnet.bscTest]: "0x8F3273Fb89B075b1645095ABaC6ed17B2d4Bc576",

    [chainIdMainnet.polygon]: "",
    [chainIdTestnet.polygonMumbai]: "",

    [chainIdMainnet.avax]: "",
    [chainIdTestnet.fuji]: "",
  },
};

export default contractsAddresses;

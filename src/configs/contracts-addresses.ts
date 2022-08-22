import { chainIdMainnet, chainIdTestnet } from "configs/networks";

const contractsAddresses = {
  courseMarketplace: {
    [chainIdMainnet.mainnet]: "",
    [chainIdTestnet.goerli]: "",

    [chainIdMainnet.bsc]: "",
    [chainIdTestnet.bscTest]: "",

    [chainIdMainnet.polygon]: "",
    [chainIdTestnet.polygonMumbai]: "0xBC100aE36A319aDCB9bEcF2D51a89ac0C052a384",

    [chainIdMainnet.avax]: "",
    [chainIdTestnet.fuji]: "",
  },
};

export default contractsAddresses;

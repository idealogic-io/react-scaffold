import { ChainId } from "utils/web3";
import { Address } from "utils/web3/types";

const ContractAddress: { [key: string]: Address } = {
  courseMarketplace: {
    [ChainId.Mainnet]: "",
    [ChainId.Testnet]: "0xBC100aE36A319aDCB9bEcF2D51a89ac0C052a384",
  },
};

export default ContractAddress;

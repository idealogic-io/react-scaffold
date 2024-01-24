import { CHAINS_IDS } from "configs";

import scaffoldTokenAbi from "./abi/scaffoldToken.json";
import rewardTokenAbi from "./abi/rewardToken.json";
import stakingAbi from "./abi/staking.json";

export const contractsAddresses = {
  [CHAINS_IDS.BSC_TEST]: {
    scaffoldToken: {
      address: "0x68CE56b6b18e9aF8940B6CEa050dA2085FA738df",
      chainId: CHAINS_IDS.BSC_TEST,
      abi: scaffoldTokenAbi,
    },
    rewardToken: {
      address: "0xE07Dd6D99BC89107f4A9e00F06914053fC1Ac9F3",
      chainId: CHAINS_IDS.BSC_TEST,
      abi: rewardTokenAbi,
    },
    staking: {
      address: "0x7393bEd430C811411a5e19A87b2e66ce80B23072",
      chainId: CHAINS_IDS.BSC_TEST,
      abi: stakingAbi,
    },
  },
};

import { CHAINS_IDS } from "configs/chains";

import { SCAFFOLD_ABI } from "./abi/scaffoldToken";
import { REWARD_ABI } from "./abi/rewardToken";
import { STAKING_ABI } from "./abi/staking";
import { TEST_DATA_ABI } from "./abi/testData";

export type Contract<TAbi extends readonly unknown[]> = {
  config: {
    address: `0x${string}`;
    chainId: number;
    abi: TAbi;
  };
  name?: string;
  symbol?: string;
  decimals?: number;
};

export const CONTRACTS = {
  [CHAINS_IDS.BSC_TEST]: {
    scaffoldToken: {
      config: {
        address: "0x68CE56b6b18e9aF8940B6CEa050dA2085FA738df",
        chainId: CHAINS_IDS.BSC_TEST,
        abi: SCAFFOLD_ABI,
      },
      name: "Scaffold Token",
      symbol: "SCT",
      decimals: 18,
    } as Contract<typeof SCAFFOLD_ABI>,
    rewardToken: {
      config: {
        address: "0xE07Dd6D99BC89107f4A9e00F06914053fC1Ac9F3",
        chainId: CHAINS_IDS.BSC_TEST,
        abi: REWARD_ABI,
      },
    } as Contract<typeof REWARD_ABI>,
    staking: {
      config: {
        address: "0x7393bEd430C811411a5e19A87b2e66ce80B23072",
        chainId: CHAINS_IDS.BSC_TEST,
        abi: STAKING_ABI,
      },
    } as Contract<typeof STAKING_ABI>,
    testData: {
      config: {
        address: "0x4c19aBC335C8d33fB49dF976E13FfD40a985EC7E",
        chainId: CHAINS_IDS.BSC_TEST,
        abi: TEST_DATA_ABI,
      },
    } as Contract<typeof TEST_DATA_ABI>,
  },
} as const;

import React from "react";
import { useTranslation } from "react-i18next";

import { useMulticall } from "hooks";
import { FlexGap, Text } from "components";

import { CHAINS_IDS } from "configs/chains";
import { CONTRACTS } from "configs/contracts";

const ContractReadExampleLvl2: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "ContractReadExample" });

  // eslint-disable-next-line
  const { data } = useMulticall({
    multicallConfig: {
      chainId: CHAINS_IDS.BSC_TEST,
      contracts: [
        {
          ...CONTRACTS[CHAINS_IDS.BSC_TEST].scaffoldToken.config,
          functionName: "balanceOf",
          args: ["0xc3f4929ECC1bBd794aD46089B8C1e9777c11Ea4D"],
        },
      ],
    },
  });

  return (
    <FlexGap flexDirection="column" gap="16px">
      <Text textAlign="justify">{t("article1")}</Text>
    </FlexGap>
  );
};

export default ContractReadExampleLvl2;

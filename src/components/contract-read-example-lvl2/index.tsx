import React from "react";
import { useTranslation } from "react-i18next";

import { useMulticall } from "hooks";
import { FlexGap, Text } from "components";

import { CHAINS_IDS } from "configs/chains";
import { CONTRACTS } from "configs/contracts";

const ContractReadExampleLvl2: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "ContractReadExample" });

  const { data } = useMulticall({
    multicallConfig: {
      chainId: CHAINS_IDS.BSC_TEST,
      contracts: [
        {
          ...CONTRACTS[CHAINS_IDS.BSC_TEST].testData.config,
          functionName: "getTestData",
        },
        {
          ...CONTRACTS[CHAINS_IDS.BSC_TEST].testData.config,
          functionName: "getTestArrayData",
        },
        {
          ...CONTRACTS[CHAINS_IDS.BSC_TEST].testData.config,
          functionName: "getTestAmountWithRequire",
        },
      ],
    },
  });

  if (data) {
    const firstData = data[2];
    if (firstData) {
      // eslint-disable-next-line
      console.log(firstData);
    }

    const secondData = data[0];

    if (secondData) {
      // eslint-disable-next-line
      console.log(secondData.testHash);
    }
  }

  return (
    <FlexGap flexDirection="column" gap="16px">
      <Text textAlign="justify">{t("article1")}</Text>
    </FlexGap>
  );
};

export default ContractReadExampleLvl2;

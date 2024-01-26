import React from "react";
import { useTranslation } from "react-i18next";

import { useContractWrite } from "hooks";
import { FlexGap, Button, Link, Text } from "components";

import { CHAINS_IDS } from "configs/chains";
import { CONTRACTS } from "configs/contracts";

const ContractWriteExample: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "ContractWriteExample" });
  const { write, isWaiting, isSuccess, trxLink } = useContractWrite({
    ...CONTRACTS[CHAINS_IDS.BSC_TEST].scaffoldToken.config,
    functionName: "mint",
  });

  return (
    <FlexGap flexDirection="column" gap="16px">
      <Text textAlign="justify">{t("article1")}</Text>
      <FlexGap gap="16px">
        <Button onClick={write} isLoading={isWaiting} disabled={!isSuccess}>
          {t("mint")}
        </Button>
        {trxLink && (
          <Link href={trxLink} external>
            {t("scanner")}
          </Link>
        )}
      </FlexGap>
    </FlexGap>
  );
};

export default ContractWriteExample;

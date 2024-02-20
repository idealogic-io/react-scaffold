import React from "react";
import BigNumber from "bignumber.js";
import { Trans, useTranslation } from "react-i18next";
import { useAccount, useBalance, useReadContract } from "wagmi";

import { useContractWrite } from "hooks";

import { FlexGap, Column, Text, Button, Link } from "components";

import { CHAINS_IDS } from "configs/chains";
import { CONTRACTS } from "configs/contracts";

const ContractExampleLvl1: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "ContractExampleLvl1" });
  const { address, chain } = useAccount();

  const { data: nativeTokenBalance } = useBalance({
    address,
  });

  const { data: scaffoldTokenBalance } = useReadContract({
    ...CONTRACTS[CHAINS_IDS.BSC_TEST].scaffoldToken.config,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });

  const { write, isSuccess, isWaiting, trxLink } = useContractWrite({
    ...CONTRACTS[CHAINS_IDS.POLYGON_TEST].scaffoldToken.config,
    functionName: "mint",
  });

  return (
    <FlexGap flexDirection="column" gap="24px">
      <FlexGap flexDirection="column" gap="16px">
        <Text textAlign="justify">{t("article1")}</Text>
        <Column>
          <Text>
            <Trans
              t={t}
              i18nKey="tokenBalance"
              values={{
                tokenName: chain?.nativeCurrency.name ?? "",
                tokenSymbol: chain?.nativeCurrency.symbol ?? "",
                balance: BigNumber(nativeTokenBalance?.formatted ?? "0").toFormatExtended(4),
              }}
              components={{ bold: <strong /> }}
            />
          </Text>
          <Text>
            <Trans
              t={t}
              i18nKey="tokenBalance"
              values={{
                tokenName: CONTRACTS[CHAINS_IDS.BSC_TEST].scaffoldToken.name,
                tokenSymbol: CONTRACTS[CHAINS_IDS.BSC_TEST].scaffoldToken.symbol,
                balance: BigNumber(scaffoldTokenBalance?.toString() ?? 0)
                  .decimalExponentFormat(CONTRACTS[CHAINS_IDS.BSC_TEST].scaffoldToken.decimals ?? 0)
                  .toFormatExtended(4),
              }}
              components={{ bold: <strong /> }}
            />
          </Text>
        </Column>
      </FlexGap>
      <FlexGap flexDirection="column" gap="16px">
        <Text textAlign="justify">
          <Trans t={t} i18nKey="article1" components={{ bold: <strong /> }} />
        </Text>
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
    </FlexGap>
  );
};

export default ContractExampleLvl1;

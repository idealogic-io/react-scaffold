import React from "react";
import BigNumber from "bignumber.js";
import { Trans, useTranslation } from "react-i18next";
import { useAccount, useNetwork, useBalance, useContractRead } from "wagmi";

import { FlexGap, Column, Text } from "components";

import { CHAINS_IDS } from "configs/chains";
import { CONTRACTS } from "configs/contracts";

const ContractReadExample: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "ContractReadExample" });
  const { address } = useAccount();
  const { chain } = useNetwork();

  const { data: nativeTokenBalance } = useBalance({
    address,
  });

  const { data: scaffoldTokenBalance } = useContractRead({
    ...CONTRACTS[CHAINS_IDS.BSC_TEST].scaffoldToken.config,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    watch: true,
  });

  return (
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
  );
};

export default ContractReadExample;

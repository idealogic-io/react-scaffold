import React from "react";
import BigNumber from "bignumber.js";
import { useAccount } from "wagmi";
import { useTranslation } from "react-i18next";
// import { zeroAddress } from "viem";

import { useMulticall, useInputHandlerWithMax, useContractWrite } from "hooks";
import { FlexGap, Text, Button, InputNumeric } from "components";

import { CHAINS_IDS } from "configs/chains";
import { CONTRACTS } from "configs/contracts";

const ContractExampleLvl2: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "ContractExampleLvl2" });
  const { address } = useAccount();

  const multicallResult = address
    ? useMulticall(
        {
          chainId: CHAINS_IDS.BSC_TEST,
          contracts: [
            {
              ...CONTRACTS[CHAINS_IDS.BSC_TEST].scaffoldToken.config,
              functionName: "balanceOf",
              args: [address],
            },
            {
              ...CONTRACTS[CHAINS_IDS.BSC_TEST].scaffoldToken.config,
              functionName: "allowance",
              args: [address, CONTRACTS[CHAINS_IDS.BSC_TEST].staking.config.address],
            },
            {
              ...CONTRACTS[CHAINS_IDS.BSC_TEST].staking.config,
              functionName: "getStakersData",
              args: [address],
            },
            {
              ...CONTRACTS[CHAINS_IDS.BSC_TEST].staking.config,
              functionName: "calculateReward",
              args: [address],
            },
          ],
        },
        {
          refreshInterval: 30_000,
        },
      )
    : undefined;

  const { data, refresh: refreshMulticall } = multicallResult || {};
  const [balance, allowance, stakersData, reward] = data || [];

  const { onInputChange, value, inputValue, shouldApprove, maxHandler, reset } = useInputHandlerWithMax(
    balance,
    allowance,
    CONTRACTS[CHAINS_IDS.BSC_TEST].scaffoldToken.decimals,
  );

  const {
    write: claim,
    isWaiting: isClaimWaiting,
    isSuccess: isClaimAvailable,
  } = useContractWrite(
    {
      ...CONTRACTS[CHAINS_IDS.BSC_TEST].staking.config,
      functionName: "claim",
    },
    { updateCallback: refreshMulticall },
  );

  const {
    write: deposit,
    isWaiting: isDepositWaiting,
    isSuccess: isDepositAvailable,
  } = useContractWrite(
    {
      ...CONTRACTS[CHAINS_IDS.BSC_TEST].staking.config,
      functionName: "deposit",
      args: [BigInt(value ?? 0)],
    },
    {
      updateCallback: refreshMulticall,
      successCallback: reset,
    },
  );

  const {
    write: approve,
    isWaiting: isApproveWaiting,
    isSuccess: isApproveAvailable,
  } = useContractWrite(
    {
      ...CONTRACTS[CHAINS_IDS.BSC_TEST].scaffoldToken.config,
      functionName: "approve",
      args: [CONTRACTS[CHAINS_IDS.BSC_TEST].staking.config.address, BigInt(value ?? 0)],
    },
    { updateCallback: refreshMulticall },
  );

  const {
    write: unstake,
    isWaiting: isUnstakeWaiting,
    isSuccess: isUnstakeAvailable,
  } = useContractWrite(
    {
      ...CONTRACTS[CHAINS_IDS.BSC_TEST].staking.config,
      functionName: "withdraw",
    },
    {
      updateCallback: refreshMulticall,
      successCallback: reset,
    },
  );

  return (
    <FlexGap flexDirection="column" gap="16px">
      <Text textAlign="justify">
        {t("staked", {
          amount: BigNumber(stakersData?.amount?.toString() ?? 0)
            .decimalExponentFormat(CONTRACTS[CHAINS_IDS.BSC_TEST].scaffoldToken.decimals ?? 18)
            .toFormatExtended(4),
          tokenName: CONTRACTS[CHAINS_IDS.BSC_TEST].scaffoldToken.symbol,
        })}
      </Text>
      <Text textAlign="justify">
        {t("reward", {
          amount: BigNumber(reward?.toString() ?? 0)
            .decimalExponentFormat(CONTRACTS[CHAINS_IDS.BSC_TEST].rewardToken.decimals ?? 18)
            .toFormatExtended(4),
          tokenName: CONTRACTS[CHAINS_IDS.BSC_TEST].rewardToken.symbol,
        })}
      </Text>
      <Button onClick={claim} isLoading={isClaimWaiting} disabled={!isClaimAvailable}>
        {t("claim")}
      </Button>

      <Text textAlign="justify">
        {t("tokenBalance", {
          balance: BigNumber(balance?.toString() ?? 0)
            .decimalExponentFormat(CONTRACTS[CHAINS_IDS.BSC_TEST].scaffoldToken.decimals ?? 18)
            .toFormatExtended(4),
          tokenSymbol: CONTRACTS[CHAINS_IDS.BSC_TEST].scaffoldToken.symbol,
        })}
      </Text>

      <FlexGap gap="16px">
        <InputNumeric value={inputValue} onUserInput={onInputChange} placeholder={t("stakeAmount")} />
        <Button onClick={maxHandler}>{t("max")}</Button>
      </FlexGap>

      {shouldApprove && (
        <Button onClick={approve} isLoading={isApproveWaiting} disabled={!isApproveAvailable}>
          {t("approve")}
        </Button>
      )}

      {!shouldApprove && (
        <Button onClick={deposit} isLoading={isDepositWaiting} disabled={!isDepositAvailable}>
          {t("stake")}
        </Button>
      )}

      <Button onClick={unstake} isLoading={isUnstakeWaiting} disabled={!isUnstakeAvailable}>
        {t("unstake", {
          amount: BigNumber(stakersData?.amount?.toString() ?? 0)
            .decimalExponentFormat(CONTRACTS[CHAINS_IDS.BSC_TEST].scaffoldToken.decimals ?? 18)
            .toFormat(0),
          tokenName: CONTRACTS[CHAINS_IDS.BSC_TEST].scaffoldToken.symbol,
        })}
      </Button>

      <Text textAlign="justify">{t("article1")}</Text>
    </FlexGap>
  );
};

export default ContractExampleLvl2;

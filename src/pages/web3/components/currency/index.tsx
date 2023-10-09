import React, { useMemo, useState } from "react";
import BigNumber from "bignumber.js";
import { parseUnits } from "@ethersproject/units";

import { Button, Column, Flex, InputGroup, InputNumeric, Skeleton, Text } from "components";

import {
  maxAmountToSpend,
  useNativeCurrency,
  useTokenContract,
  useSendTransfer,
  useEstimateTransferFee,
  ZERO,
  useApproveCallback,
  ApprovalState,
  CurrencyAmount,
} from "configs/web3";

import { CurrencyProps } from "./types";

const to = "0x0FCfB928AC2164Df4f61C5e140bb3D13115A1e22";

export const Currency: React.FC<CurrencyProps> = ({ currency, currencyAmount, chainId }) => {
  const [input, setInput] = useState("");

  const inputBigNumber = BigNumber(input || "0");
  const token = currency.wrapped;

  const tokenContract = useTokenContract(token.address);
  const nativeCurrency = useNativeCurrency(chainId);

  const value = parseUnits(input || "0", currency.decimals);
  const maxInputAmount = useMemo(() => maxAmountToSpend(currencyAmount), [currencyAmount]);

  const showMaxButton = maxInputAmount && maxInputAmount.amount.gt(0) && !inputBigNumber.eq(maxInputAmount.amount);
  const isExceededBalance = inputBigNumber.gt(currencyAmount?.amount ?? ZERO);

  const {
    gasEstimation,
    error: gasEstimationError,
    isValidating: gasEstimationLoading,
  } = useEstimateTransferFee(tokenContract, currency.isNative, to, value);

  const { sendToken } = useSendTransfer({ contract: tokenContract, to });

  // This is the test approve state only shows how to use it
  const [approvalState, approveCallback] = useApproveCallback(
    // Use full amount or use only desired value
    // currencyAmount,
    input ? new CurrencyAmount(currency, inputBigNumber) : undefined,
    "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696",
  );

  const onMaxClick = () => {
    setInput(maxInputAmount?.amount.toString() ?? "");
  };

  const onSendClick = () => {
    sendToken(value, currency.isNative);
  };

  return (
    <Column alignItems="center" my="12px">
      <Text textScale="body3">{currency.name}</Text>
      <Text textScale="body3">{currency.symbol}</Text>
      <Text textScale="body3">Decimals: {currency.decimals}</Text>
      <Text textScale="body3">
        Balance: {currencyAmount?.amount.toFormatExtended(8)} {currency.symbol}
      </Text>

      <InputGroup
        maxWidth="50%"
        label="Enter amount"
        error="Insufficient funds"
        isTouched={isExceededBalance && !!input}
      >
        <InputNumeric value={input} onUserInput={setInput} textAlign="right" placeholder="0" />
      </InputGroup>
      {showMaxButton && (
        <Flex width="50%" justifyContent="flex-end">
          <Button width="fit-content" onClick={onMaxClick}>
            Max
          </Button>
        </Flex>
      )}

      <Text textScale="body3">Approval state is:</Text>
      <Text textScale="body3">{ApprovalState[approvalState]}</Text>

      <Button
        onClick={onSendClick}
        disabled={!input || isExceededBalance || gasEstimationError || approvalState !== ApprovalState["APPROVED"]}
        isLoading={gasEstimationLoading}
        my="8px"
      >
        Send
      </Button>

      <Button onClick={approveCallback} disabled={approvalState === ApprovalState["APPROVED"] || !input} my="8px">
        Approve
      </Button>

      <Flex width="50%" justifyContent="flex-start">
        {gasEstimationLoading ? (
          <Skeleton ml="8px" width="50%" height="14px" />
        ) : (
          <Text textScale="body3" textAlign="left">
            Network Fee: {gasEstimation.toFormatExtended(18)} {nativeCurrency.symbol}
          </Text>
        )}
      </Flex>
    </Column>
  );
};

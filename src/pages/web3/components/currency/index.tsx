import React, { useMemo, useState } from "react";
import BigNumber from "bignumber.js";
import { parseUnits } from "@ethersproject/units";

import { Button, Column, Flex, InputGroup, InputNumeric, Text } from "components";

import { CurrencyProps } from "./types";
import { maxAmountToSpend, useNativeCurrency, useEstimateTxFee, useTokenContract } from "configs/connectors";

const to = "0x0FCfB928AC2164Df4f61C5e140bb3D13115A1e22";

export const Currency: React.FC<CurrencyProps> = ({ currency, currencyAmount, account }) => {
  const [input, setInput] = useState("");
  const inputBigNumber = BigNumber(input || "0");
  const token = currency.wrapped;
  const tokenContract = useTokenContract(token.address);
  const nativeCurrency = useNativeCurrency();

  const maxInputAmount = useMemo(() => maxAmountToSpend(currencyAmount), [currencyAmount]);

  const tx = {
    from: account,
    to,
    value: parseUnits(input || "0", currency.decimals),
  };

  // const { gasEstimation, error, isValidating: gasEstimationLoading } = useEstimateTxFee(tx);
  // console.log({ gasEstimation: gasEstimation.toFixed(18), error, gasEstimationLoading, currency });

  // useEstimateNetworkFee(tokenContract, "transfer")

  //   const { sendToken } = useSendTransfer({ address: token.address, to });
  // This is the test approve state only shows how to use it
  //   const [approvalState, approveCallback] = useApproveCallback(
  //     token,
  //     +debouncedValue > 0 ? debouncedValue : undefined,
  //     chainId ? contractsAddresses.multicall[chainId] : undefined,
  //   );

  // console.log(gasEstimation, "gasEstimation");
  // console.log(!!gasEstimationError, "gasEstimationError", currency.symbol);

  const showMaxButton = maxInputAmount && maxInputAmount.amount.gt(0) && !inputBigNumber.eq(maxInputAmount.amount);
  const isExceededBalance = inputBigNumber.gt(currencyAmount?.amount ?? BigNumber("0"));

  const onMaxClick = () => {
    setInput(maxInputAmount?.amount.toString() ?? "");
  };

  //   const onSendClick = () => {
  //     sendToken(parseUnits(formatValueToBNString(input), token.decimals));
  //   };

  return (
    <Column alignItems="center">
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

      {/* <Text textScale="body3">Approval state is:</Text>
        <Text textScale="body3">{ApprovalState[approvalState]}</Text> */}

      {/* <Button
          onClick={onSendClick}
          disabled={!input || gasEstimationError || isExceeded || approvalState !== ApprovalState["APPROVED"]}
          isLoading={gasEstimationLoading}
          my="8px"
        >
          Send
        </Button> */}

      {/* <Button onClick={approveCallback} disabled={approvalState === ApprovalState["APPROVED"] || !input} my="8px">
          Approve
        </Button> */}

      {/* {gasEstimationLoading ? (
        <Skeleton ml="8px" width="50%" height="14px" />
      ) : (
        <Text textScale="body3">
          Network Fee: {gasEstimation.toFormat(8)} {nativeCurrency?.symbol}
        </Text>
      )} */}
    </Column>
  );
};

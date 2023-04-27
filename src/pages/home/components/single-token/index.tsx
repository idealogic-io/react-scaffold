import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { parseUnits } from "@ethersproject/units";
import BigNumber from "bignumber.js";

import { Box, Button, Column, InputGroup, InputNumeric, Skeleton, Text } from "components";

import {
  useEstimateNetworkFee,
  useDebounce,
  useSendTransfer,
  useApproveCallback,
  ApprovalState,
  useTokenAmount,
  useNativeCurrency,
} from "hooks";
import { formatValueToBNString, isExceededBalance } from "utils/web3";
import { contractsAddresses } from "configs";

import { SingleTokenProps } from "./types";

const to = "0x0FCfB928AC2164Df4f61C5e140bb3D13115A1e22";

const SingleToken: React.FC<SingleTokenProps> = ({ token, nativeBalance }) => {
  const [input, setInput] = useState("");

  const { chainId } = useWeb3React();
  const debouncedValue = useDebounce(formatValueToBNString(input), 1000);
  const tokenAmount = useTokenAmount(token);
  const nativeCurrency = useNativeCurrency();

  const {
    gasEstimation,
    isValidating: gasEstimationLoading,
    error: gasEstimationError,
  } = useEstimateNetworkFee(token.address, "transfer", [
    to,
    parseUnits(debouncedValue || "0", tokenAmount.token.decimals),
  ]);
  const { sendToken } = useSendTransfer({ address: token.address, to });
  // This is the test approve state only shows how to use it
  const [approvalState, approveCallback] = useApproveCallback(
    token,
    +debouncedValue > 0 ? debouncedValue : undefined,
    chainId ? contractsAddresses.multicall[chainId] : undefined,
  );

  const isExceeded = isExceededBalance({
    token: tokenAmount.token,
    tokenBalance: tokenAmount.amount,
    nativeBalance: nativeBalance,
    gasEstimation: gasEstimation,
    value: BigNumber(input),
  });

  const onSendClick = () => {
    sendToken(parseUnits(formatValueToBNString(input), token.decimals));
  };

  return (
    <Box p="6px">
      <InputGroup label="Enter amount" error="Insufficient funds" isTouched={isExceeded && !!input}>
        <InputNumeric value={input} onUserInput={setInput} textAlign="right" placeholder="0" />
      </InputGroup>

      <Column alignItems="center">
        <Text textScale="body3">{token.name}</Text>
        <Text textScale="body3">{token.symbol}</Text>
        <Text textScale="body3">{token.decimals}</Text>

        <Text textScale="body3">Approval state is:</Text>
        <Text textScale="body3">{ApprovalState[approvalState]}</Text>

        <Button
          onClick={onSendClick}
          disabled={!input || gasEstimationError || isExceeded || approvalState !== ApprovalState["APPROVED"]}
          isLoading={gasEstimationLoading}
          my="8px"
        >
          Send
        </Button>

        <Button onClick={approveCallback} disabled={approvalState === ApprovalState["APPROVED"] || !input} my="8px">
          Approve
        </Button>

        {gasEstimationLoading ? (
          <Skeleton ml="8px" width="50%" height="14px" />
        ) : (
          <Text textScale="body3">
            Network Fee: {gasEstimation.toFormat(8)} {nativeCurrency?.symbol}
          </Text>
        )}

        <Text textScale="body3">
          Current Balance: {tokenAmount.amount.toFormat(8)} {tokenAmount.token.symbol}
        </Text>
      </Column>
    </Box>
  );
};

export default SingleToken;

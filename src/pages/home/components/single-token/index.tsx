import React, { useState } from "react";
import { parseUnits } from "@ethersproject/units";

import { Box, Button, Column, InputNumeric, Skeleton, Text } from "components";

import { useCurrency, useCurrencyBalance, useTokenContract, useEstimateNetworkFee } from "hooks";
import { formatBigNumberToFixed } from "utils/web3";

const toAddress = "0x0FCfB928AC2164Df4f61C5e140bb3D13115A1e22";

const SingleToken: React.FC<{ address: string }> = ({ address }) => {
  const [input, setInput] = useState("0.01");

  const contract = useTokenContract(address);
  const currency = useCurrency(address);
  const {
    gasEstimation,
    isValidating: gasEstimationLoading,
    error: gasEstimationError,
  } = useEstimateNetworkFee(contract, "transfer", [toAddress, parseUnits(input || "0", currency?.decimals)]);

  // const { sendToken, pendingTx } = useSendToken({ address, toAddress, token });

  const { balance } = useCurrencyBalance(address);

  // const isExceededBalance = checkExceededBalance({
  //   isNativeToken: token.isNative,
  //   balance: +balance,
  //   tokenBalance: +token.balance,
  //   txFee: estimate.txFee,
  //   value: +valueToSend,
  // });

  // const onSendClick = () => {
  //   sendToken(valueToSend);
  // };

  return (
    <Box p="6px">
      <InputNumeric value={input} onUserInput={setInput} />
      <Column alignItems="center">
        <Text>{currency?.name}</Text>
        <Text>{currency?.symbol}</Text>
        <Text>{currency?.decimals}</Text>
        {currency && (
          <Text>
            {+formatBigNumberToFixed(balance, 6, currency.decimals)} {currency.symbol}
          </Text>
        )}

        <Button
          // onClick={onSendClick}
          disabled={!input || gasEstimationError}
          isLoading={!currency || gasEstimationLoading}
        >
          Send
        </Button>

        {gasEstimationLoading ? (
          <>
            <Text fontSize="12px" letterSpacing="0.4px">
              Network Fee:
            </Text>
            <Skeleton ml="8px" width="50%" height="14px" />
          </>
        ) : (
          <Text fontSize="12px" letterSpacing="0.4px">
            Network Fee: {+formatBigNumberToFixed(gasEstimation, 8, 18)} {currency?.symbol}
          </Text>
        )}

        {/* {isExceededBalance ? (
          <Text>Insufficient funds</Text>
        ) : estimate.isLoading ? (
          <>
            <Text fontSize="12px" letterSpacing="0.4px">
              Network Fee:
            </Text>
            <Skeleton ml="8px" width="50%" height="14px" />
          </>
        ) : (
          <Text fontSize="12px" letterSpacing="0.4px">
            Network Fee: {estimate.txFee} {symbol}
          </Text>
        )} */}
      </Column>
    </Box>
  );
};

export default SingleToken;

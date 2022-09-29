import React from "react";
import { useWeb3React } from "@web3-react/core";

import { nativeCurrencies } from "configs";
import { Box, Button, Column, Skeleton, Text } from "components";
import { checkExceededBalance } from "utils/web3";

import { useEstimateTxFee, useSendToken, useTokenData } from "./hooks";

const toAddress = "0x0FCfB928AC2164Df4f61C5e140bb3D13115A1e22";
const valueToSend = "0.01";

const SingleToken: React.FC<{ address: string; balance: string }> = ({ address, balance }) => {
  const { chainId } = useWeb3React();
  const { data: token } = useTokenData({ address });
  const { estimate } = useEstimateTxFee({ address, token, toAddress, valueToSend });
  const { sendToken, pendingTx } = useSendToken({ address, toAddress, token });

  const symbol = chainId ? nativeCurrencies[chainId].symbol : "";

  const isExceededBalance = checkExceededBalance({
    isNativeToken: token.isNative,
    balance: +balance,
    tokenBalance: +token.balance,
    txFee: estimate.txFee,
    value: +valueToSend,
  });

  const onSendClick = () => {
    sendToken(valueToSend);
  };

  return (
    <Box p="6px">
      <Column alignItems="center">
        <Text>{token.name}</Text>
        <Text>{token.symbol}</Text>
        <Text>{token.balance}</Text>

        <Button
          onClick={onSendClick}
          disabled={isExceededBalance || !address || !valueToSend}
          isLoading={pendingTx || estimate.isLoading || token.isLoading}
        >
          Send
        </Button>

        {isExceededBalance ? (
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
        )}
      </Column>
    </Box>
  );
};

export default SingleToken;

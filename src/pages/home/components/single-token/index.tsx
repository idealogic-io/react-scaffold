import React from "react";
import { useWeb3React } from "@web3-react/core";

import { nativeCurrencies } from "configs";
import { Box, Button, Column, Text } from "components";
import { checkExceededBalance } from "utils/web3";

import { useSendToken, useTokenData } from "./hooks";

const SingleToken: React.FC<{ address: string; balance: string }> = ({ address, balance }) => {
  const { chainId } = useWeb3React();
  const { data, valueToSend, isNativeToken } = useTokenData({ address });
  const { sendToken, pendingTx } = useSendToken({ address });

  const isExceededBalance = checkExceededBalance({
    isNativeToken,
    balance: +balance,
    tokenBalance: +data.balance,
    txFee: +data.txFee,
    value: valueToSend,
  });

  return (
    <Box p="6px">
      <Column alignItems="center">
        <Text>{data.name}</Text>
        <Text>{data.symbol}</Text>
        <Text>{data.balance}</Text>

        {!isExceededBalance && (
          <Button onClick={() => sendToken()} isLoading={pendingTx || data.isLoading}>
            Send
          </Button>
        )}

        {chainId && (
          <Text>
            Estimated tx fee: {data.txFee} {nativeCurrencies[chainId]?.symbol}
          </Text>
        )}
      </Column>
    </Box>
  );
};

export default SingleToken;

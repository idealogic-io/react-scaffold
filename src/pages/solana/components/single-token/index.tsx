import React from "react";

import { Box, Button, Column, Text } from "components";

import { useCheckAssociatedTokenAddress, useEstimateTxFee, useSendToken, useTokenData } from "./hooks";
import { checkExceededBalance } from "utils/web3";

type SingleTokenProps = {
  address: string;
  balance: number;
};

const SingleToken: React.FC<SingleTokenProps> = ({ address, balance }) => {
  const { data, valueToSend, isNativeToken } = useTokenData({ address });

  const { sendToken, pendingTx } = useSendToken({ address });
  const {
    associatedAddress,
    loading: pendingAssociateToken,
    createAssociatedTokenAccount,
  } = useCheckAssociatedTokenAddress({ address });

  const { txFee } = useEstimateTxFee({ address });

  const isExceededBalance = checkExceededBalance({
    isNativeToken,
    balance: +balance,
    tokenBalance: +data.balance,
    txFee: txFee,
    value: valueToSend,
  });

  return (
    <Box p="6px">
      <Column alignItems="center">
        <Text>{data.name}</Text>
        <Text>{data.symbol}</Text>
        <Text>{data.balance}</Text>

        {!isExceededBalance && (
          <Button
            onClick={associatedAddress || data.isNativeToken ? sendToken : createAssociatedTokenAccount}
            isLoading={pendingTx || data.isLoading || pendingAssociateToken}
          >
            {associatedAddress || data.isNativeToken ? "Send" : "Create Address"}
          </Button>
        )}

        <Text>Estimated tx fee: {txFee} SOL</Text>
      </Column>
    </Box>
  );
};

export default SingleToken;

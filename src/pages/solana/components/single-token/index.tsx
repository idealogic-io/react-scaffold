import React from "react";
import { PublicKey } from "@solana/web3.js";

import { Box, Button, Column, Skeleton, Text } from "components";

import { useCheckAssociatedTokenAddress, useEstimateTxFee, useSendToken, useTokenData } from "./hooks";
import { checkExceededBalance } from "utils/web3";
import { SOLANA } from "configs/networks";

type SingleTokenProps = {
  address: string;
  balance: number;
};

const toAddress = "9SbgsBgRRF2eCFsi3n7iuWFY192jkcJCdTW8r91iztKp";
const toPubkey = new PublicKey(toAddress);
const valueToSend = "0.01";

const SingleToken: React.FC<SingleTokenProps> = ({ address, balance }) => {
  const { data: token } = useTokenData({ address, update: false });
  const {
    associatedAddress,
    loading: pendingAssociateToken,
    createTxForAssociatedTokenAccount,
    createAssociatedTokenAccount,
  } = useCheckAssociatedTokenAddress({ address, toPubkey, token });
  const { sendToken, pendingTx, createTxToSend } = useSendToken({ address, toPubkey, token });
  const { estimate } = useEstimateTxFee({
    address,
    valueToSend,
    associatedAddress,
    token,
    createTxToSend,
    createTxForAssociatedTokenAccount,
  });

  const isExceededBalance = checkExceededBalance({
    isNativeToken: token.isNative,
    balance: balance,
    tokenBalance: +token.balance,
    txFee: estimate.txFee,
    value: +valueToSend,
  });

  return (
    <Box p="6px">
      <Column alignItems="center">
        <Text>{token.name}</Text>
        <Text>{token.symbol}</Text>
        <Text>{token.balance}</Text>

        {!isExceededBalance && (
          <Button
            onClick={associatedAddress || token.isNative ? () => sendToken(valueToSend) : createAssociatedTokenAccount}
            isLoading={pendingTx || token.isLoading || pendingAssociateToken}
          >
            {associatedAddress || token.isNative ? "Send" : "Create Address"}
          </Button>
        )}

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
            Network Fee: {estimate.txFee} {SOLANA.symbol}
          </Text>
        )}
      </Column>
    </Box>
  );
};

export default SingleToken;

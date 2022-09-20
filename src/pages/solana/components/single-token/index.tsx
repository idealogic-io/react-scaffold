import React from "react";
import { toast } from "react-toastify";

import { Box, Button, Column, Text, ToastDescriptionWithTxSolana } from "components";
import { toastOptions } from "configs";
import { useWaitTransactionSolana } from "hooks";
import { useTranslation } from "context";
import { useTokenData } from "./hooks";

type SingleTokenProps = {
  address: string;
};

const SingleToken: React.FC<SingleTokenProps> = ({ address }) => {
  const { t } = useTranslation();
  const { fetchWithCatchTxErrorSolana, loading: pendingTx } = useWaitTransactionSolana();
  const { tokenData, valueToSend, isNativeToken, getTokenData, createNativeTransferTx, createCustomTransferTx } =
    useTokenData({ address });

  const isExceededBalance = isNativeToken
    ? +tokenData.balance - tokenData.txFee <= valueToSend
    : +tokenData.balance <= valueToSend;

  const onSendHandler = async () => {
    let tx;
    if (isNativeToken) {
      tx = await createNativeTransferTx();
    } else {
      tx = await createCustomTransferTx();
    }

    if (tx) {
      const confirmed = await fetchWithCatchTxErrorSolana(tx);

      if (confirmed?.signature) {
        toast.success(
          <ToastDescriptionWithTxSolana txHash={confirmed.signature}>{t("Token sent")}</ToastDescriptionWithTxSolana>,
          toastOptions,
        );

        getTokenData();
      }
    }
  };

  return (
    <Box p="6px">
      <Column alignItems="center">
        <Text>{tokenData.name}</Text>
        <Text>{tokenData.symbol}</Text>
        <Text>{tokenData.balance}</Text>

        <Text>Estimated tx fee: {tokenData.txFee} SOL</Text>

        {!isExceededBalance && (
          <Button onClick={onSendHandler} isLoading={pendingTx}>
            Send
          </Button>
        )}
      </Column>
    </Box>
  );
};

export default SingleToken;

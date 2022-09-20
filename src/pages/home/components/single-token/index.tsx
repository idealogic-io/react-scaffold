import React from "react";
import { toast } from "react-toastify";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";

import { getERC20Contract } from "utils/web3";

import { nativeCurrencies, toastOptions } from "configs";
import { useTranslation } from "context";
import { Box, Button, Column, Text, ToastDescriptionWithTx } from "components";

import { useWaitTransaction } from "hooks";
import { useTokenData } from "./hooks";

const SingleToken: React.FC<{ address: string }> = ({ address }) => {
  const { library, chainId } = useWeb3React();
  const { fetchWithCatchTxError, loading: pendingTx } = useWaitTransaction();
  const { t } = useTranslation();
  const { tokenData, toAddress, valueToSend, isNativeToken, getTokenData } = useTokenData({ address });

  const isExceededBalance = isNativeToken
    ? +tokenData.balance - tokenData.txFee <= valueToSend
    : +tokenData.balance <= valueToSend;

  const onSendHandler = async (data: typeof tokenData) => {
    const { decimals } = data;

    const receipt = await fetchWithCatchTxError(() => {
      if (isNativeToken) {
        return sendNativeToken(decimals);
      } else {
        return sendERC20Token(decimals);
      }
    });

    if (receipt?.status) {
      toast.success(
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>{t("Token sent")}</ToastDescriptionWithTx>,
        toastOptions,
      );

      getTokenData();
    }
  };

  const sendNativeToken = async (decimal: number) => {
    const value = parseUnits(valueToSend.toString(), decimal);
    if (!library) {
      return;
    }
    const signer = library?.getSigner();

    return signer.sendTransaction({
      to: toAddress,
      value,
    });
  };

  const sendERC20Token = async (decimals: number) => {
    const value = parseUnits(valueToSend.toString(), decimals);

    const ERC20Contract = getERC20Contract(address, library?.getSigner(), chainId);
    return ERC20Contract.transfer(toAddress, value);
  };

  return (
    <Box p="6px">
      <Column alignItems="center">
        <Text>{tokenData.name}</Text>
        <Text>{tokenData.symbol}</Text>
        <Text>{tokenData.balance}</Text>

        {!isExceededBalance && (
          <Button onClick={() => onSendHandler(tokenData)} isLoading={pendingTx}>
            Send
          </Button>
        )}

        {chainId && (
          <Text>
            Estimated tx fee: {tokenData.txFee} {nativeCurrencies[chainId]?.symbol}
          </Text>
        )}
      </Column>
    </Box>
  );
};

export default SingleToken;

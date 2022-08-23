import React, { useEffect, useState } from "react";
import type { Web3Provider } from "@ethersproject/providers";
import { toast } from "react-toastify";
import { parseUnits } from "@ethersproject/units";
import { formatFixed } from "@ethersproject/bignumber";
import { useWeb3React } from "@web3-react/core";

import { getERC20Contract } from "utils/web3/contract-helpers";
import { isNullableAddress } from "utils/web3/string-helpers";
import { formatBigNumber } from "utils/web3";

import { nativeCurrencies } from "configs";
import { useTranslation } from "context";

import { Box, Button, Column, Text, ToastDescriptionWithTx } from "components";
import { useWaitTransaction } from "hooks";
// import { registerToken } from "utils/web3/add-token";

type SingleTokenProps = {
  address: string;
};

const defaultTokenData = { name: "", symbol: "", balance: "", decimals: 18, txFee: 0 };

const SingleToken: React.FC<SingleTokenProps> = ({ address }) => {
  const [tokenData, setTokenData] = useState(defaultTokenData);
  const { account, library, chainId } = useWeb3React();

  const { fetchWithCatchTxError, loading: pendingTx } = useWaitTransaction();
  const { t } = useTranslation();

  const toAddress = "0x0FCfB928AC2164Df4f61C5e140bb3D13115A1e22";
  const valueToSend = 0.01;

  useEffect(() => {
    if (chainId && library && account && address) {
      getTokenData(chainId, library, account, address);
    }
  }, [chainId, library, account, address]);

  const getTokenData = async (chainId: number, library: Web3Provider, account: string, address: string) => {
    try {
      if (!isNullableAddress(address)) {
        const ERC20Contract = getERC20Contract(address, library.getSigner(), chainId);

        const name = await ERC20Contract.name();
        const symbol = await ERC20Contract.symbol();
        const decimals = await ERC20Contract.decimals();

        const txFee = await estimateTxFee(library, decimals);

        const balanceBN = await ERC20Contract.balanceOf(account);
        const balance = formatBigNumber(balanceBN, +decimals, +decimals);

        setTokenData({ name, symbol, balance, decimals, txFee });
      } else {
        const { decimals, name, symbol } = nativeCurrencies[chainId];
        const balanceBN = await library.getBalance(account);
        const balance = formatBigNumber(balanceBN, +decimals, +decimals);

        const txFee = await estimateTxFee(library, decimals);

        setTokenData({ name, symbol, balance, decimals, txFee });
      }
    } catch (error) {
      setTokenData(defaultTokenData);
      console.error(error, address);
    }
  };

  const estimateTxFee = async (library: Web3Provider, decimals: number) => {
    try {
      const value = parseUnits(valueToSend.toString(), decimals);

      const gasPriceBN = await library.getGasPrice();
      const gasPrice = formatBigNumber(gasPriceBN);

      const gasLimitBN = await library.estimateGas({
        to: toAddress,
        value,
        gasPrice: gasPriceBN,
      });
      // TODO txFee is different from Metamask
      const txFee = +gasPrice * +formatFixed(gasLimitBN);

      return txFee;
    } catch (error) {
      console.error("Error occurred while calculating transaction fee");
      return 0;
    }
  };

  const onSendHandler = async (data: typeof tokenData) => {
    const { decimals, symbol } = data;

    const receipt = await fetchWithCatchTxError(() => {
      if (isNullableAddress(address)) {
        return sendNativeToken(decimals);
      } else {
        return sendERC20Token(symbol, decimals);
      }
    });
    if (receipt?.status) {
      toast.success(
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>{t("Token sent")}</ToastDescriptionWithTx>,
      );

      if (chainId && library && account && address) {
        getTokenData(chainId, library, account, address);
      }
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

  const sendERC20Token = async (symbol: string, decimals: number) => {
    // Uncomment this method to see it's functionality
    // if (library?.provider?.isMetaMask) {
    //   const added = await registerToken(address, symbol, decimals);
    //   console.log(added, "ADD");
    // }

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

        {+tokenData.balance > valueToSend && (
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

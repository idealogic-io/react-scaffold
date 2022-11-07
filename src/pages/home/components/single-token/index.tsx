import React, { useState } from "react";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { Currency, TokenAmount } from "@pancakeswap/sdk";

import { Box, Button, Column, InputNumeric, Skeleton, Text } from "components";

import { useEstimateNetworkFee, useDebounce, useSendTransfer } from "hooks";
import { formatBigNumberToFixed, isExceededBalance } from "utils/web3";
import { BigNumber } from "@ethersproject/bignumber";

const to = "0x0FCfB928AC2164Df4f61C5e140bb3D13115A1e22";

const SingleToken: React.FC<{ tokenAmount?: TokenAmount; nativeBalance: BigNumber; nativeCurrency?: Currency }> = ({
  tokenAmount,
  nativeBalance,
  nativeCurrency,
}) => {
  const [input, setInput] = useState("");
  const debouncedValue = useDebounce(input, 1000);

  // TODO token created but we recreate it again
  // const currency = useCurrency(address);
  const {
    gasEstimation,
    isValidating: gasEstimationLoading,
    error: gasEstimationError,
  } = useEstimateNetworkFee(tokenAmount?.token.address, "transfer", [
    to,
    parseUnits(debouncedValue || "0", tokenAmount?.token?.decimals),
  ]);
  const { sendToken } = useSendTransfer({ address: tokenAmount?.token.address, to });

  const isExceeded = isExceededBalance({
    token: tokenAmount?.token,
    tokenBalance: tokenAmount ? +tokenAmount?.toSignificant() : 0,
    nativeBalance: +formatUnits(nativeBalance, nativeCurrency?.decimals),
    gasEstimation: +formatUnits(gasEstimation, nativeCurrency?.decimals),
    value: +input,
  });

  const onSendClick = () => {
    sendToken(parseUnits(input || "0", tokenAmount?.token?.decimals));
  };

  return (
    <Box p="6px">
      <InputNumeric value={input} onUserInput={setInput} />
      <Column alignItems="center">
        <Text>{tokenAmount?.token?.name}</Text>
        <Text>{tokenAmount?.token?.symbol}</Text>
        <Text>{tokenAmount?.token?.decimals}</Text>
        {tokenAmount?.token && <Text>{tokenAmount?.toSignificant() ?? 0}</Text>}

        <Button
          onClick={onSendClick}
          disabled={!input || gasEstimationError || isExceeded}
          isLoading={!tokenAmount?.token || gasEstimationLoading}
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
            Network Fee: {+formatBigNumberToFixed(gasEstimation, 8, 18)} {tokenAmount?.token?.symbol}
          </Text>
        )}
        {isExceeded && !!input && <Text>Insufficient funds</Text>}
      </Column>
    </Box>
  );
};

export default SingleToken;

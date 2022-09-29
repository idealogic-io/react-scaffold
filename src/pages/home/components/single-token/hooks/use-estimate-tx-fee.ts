import { useEffect, useState } from "react";
import { parseUnits } from "@ethersproject/units";
import { formatFixed } from "@ethersproject/bignumber";
import { useWeb3React } from "@web3-react/core";

import { formatBigNumber, getERC20Contract } from "utils/web3";

import { TokenType } from "./use-token-data";

const defaultValue = { isLoading: false, txFee: 0 };

type UseEstimateTxFeeArgs = { address: string; token: TokenType; toAddress: string; valueToSend: string };

const useEstimateTxFee = ({ address, token, toAddress, valueToSend }: UseEstimateTxFeeArgs) => {
  const { library, chainId, account } = useWeb3React();
  const [estimate, setEstimate] = useState(defaultValue);

  useEffect(() => {
    if (address && valueToSend) {
      setEstimate(prev => ({ ...prev, isLoading: true }));
      const time = 1000;

      const timeout = setTimeout(estimateTxFee, time);

      return () => {
        clearTimeout(timeout);
      };
    } else {
      setEstimate(defaultValue);
    }
  }, [valueToSend, address, account]);

  const estimateTxFee = async () => {
    try {
      const ERC20Contract = getERC20Contract(address, library?.getSigner(), chainId);
      const _value = valueToSend.length ? valueToSend : "0";
      const value = parseUnits(_value, token.decimals);

      const gasPriceBN = await library.getGasPrice();

      let gasLimitBN = parseUnits("0");
      if (token.isNative) {
        gasLimitBN = await library.estimateGas({ to: toAddress, value });
      } else {
        gasLimitBN = await ERC20Contract.estimateGas.transfer(toAddress, value);
      }

      const gasPrice = formatBigNumber(gasPriceBN);
      const gasLimit = formatFixed(gasLimitBN);

      const txFee = +gasPrice * +gasLimit;

      setEstimate({ txFee, isLoading: false });
    } catch (error) {
      console.error(error);
      setEstimate({ txFee: 0, isLoading: false });
    }
  };

  return { estimate };
};

export default useEstimateTxFee;

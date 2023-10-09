import { Zero } from "@ethersproject/constants";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import { TransactionRequest } from "@ethersproject/abstract-provider";
import useSWR from "swr";
import BigNumber from "bignumber.js";

import { useGasPrice, useNativeCurrency } from "configs/connectors";
import { ContractMethodName, ContractMethodParams } from "hooks/use-swr-contract/types";

/**
 * Used to calculate how much the user will spend in native currency using the contract method.
 * @param contract contract
 * @param methodName contract method name
 * @param inputs contract method arguments
 * @returns Gas price multiplied by a gas limit
 */
export const useEstimateTxFee = <
  T extends Contract = Contract,
  N extends ContractMethodName<T> = ContractMethodName<T>,
>(
  contract: T,
  methodName: N,
  inputs: ContractMethodParams<T, N>,
) => {
  const { chainId } = useWeb3React();
  const { gasPrice } = useGasPrice();
  const nativeCurrency = useNativeCurrency(chainId);

  const {
    data = Zero,
    isValidating,
    error,
  } = useSWR(
    contract && chainId && contract.address
      ? `${chainId}/gasEstimation/${methodName}/${inputs}/${contract.address}`
      : null,
    async () => {
      const gasLimit = await contract.estimateGas[methodName](...inputs);

      return gasPrice.mul(gasLimit);
    },
  );

  return { gasEstimation: BigNumber(formatUnits(data, nativeCurrency?.decimals)), isValidating, error };
};

export const useEstimateTxFeeNative = (tx: TransactionRequest) => {
  const { provider, chainId } = useWeb3React();
  const { gasPrice } = useGasPrice();
  const nativeCurrency = useNativeCurrency(chainId);

  const {
    data = Zero,
    isValidating,
    error,
  } = useSWR(
    provider && tx.from && tx.to && tx.value ? `${typeof provider}/${tx.from}/${tx.to}${tx.value}` : null,
    async () => {
      const gasEstimate = await provider!.estimateGas(tx);

      return gasPrice.mul(gasEstimate);
    },
  );

  return { gasEstimation: BigNumber(formatUnits(data, nativeCurrency?.decimals)), isValidating, error };
};

export const useEstimateTransferFee = <T extends Contract = Contract>(
  contract: T,
  isNative: boolean,
  to: TransactionRequest["to"],
  value: TransactionRequest["value"],
) => {
  const { chainId, provider } = useWeb3React();
  const { gasPrice } = useGasPrice();
  const nativeCurrency = useNativeCurrency(chainId);

  const getEstimateTxFeeNative = async () => {
    return await provider!.estimateGas({ to, value });
  };

  const getEstimateTxFee = async () => {
    return await contract.estimateGas.transfer(to, value);
  };

  const {
    data = Zero,
    isValidating,
    error,
  } = useSWR(
    contract && chainId && to && value && provider && gasPrice
      ? `${chainId}/${gasPrice.toString()}/estimateTransferFee/${to}/${value}/${contract.address}/${isNative}`
      : null,
    async () => {
      let gasEstimate = Zero;
      if (isNative) {
        gasEstimate = await getEstimateTxFeeNative();
      } else {
        gasEstimate = await getEstimateTxFee();
      }

      return gasPrice.mul(gasEstimate);
    },
  );

  return { gasEstimation: BigNumber(formatUnits(data, nativeCurrency?.decimals)), isValidating, error };
};

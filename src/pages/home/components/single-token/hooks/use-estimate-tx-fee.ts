import { Zero } from "@ethersproject/constants";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "@ethersproject/bignumber";
import useSWR from "swr";

import { useDebounce, useGasPrice, useTokenContract } from "hooks";
import { getSimpleRpcProvider } from "utils/web3/simple-rpc";
import { NATIVE_ADDRESS } from "configs";

type UseEstimateTxFeeArgs = { address: string; to: string; value: BigNumber };

const useEstimateTxFee = ({ address, to, value }: UseEstimateTxFeeArgs) => {
  const { chainId } = useWeb3React();
  const contract = useTokenContract(address);
  const { gasPrice } = useGasPrice();
  const debouncedValue = useDebounce(value, 1000);

  const {
    data = Zero,
    isValidating,
    error,
  } = useSWR(
    contract && chainId ? `${chainId}/gasEstimateForTransfer/${debouncedValue}/${address}` : null,
    async () => {
      return await estimateTxFee();
    },
  );

  const estimateTxFee = async () => {
    const simpleRpcProvider = getSimpleRpcProvider(chainId!);
    const isNative = address.toLowerCase() === NATIVE_ADDRESS;

    let gasLimit = Zero;
    if (isNative) {
      gasLimit = await simpleRpcProvider.estimateGas({ to, value: debouncedValue });
    } else {
      gasLimit = await contract!.estimateGas["transfer"](to, debouncedValue);
    }

    return gasPrice.mul(gasLimit);
  };

  return { gasEstimation: data, isValidating, error };
};

export default useEstimateTxFee;

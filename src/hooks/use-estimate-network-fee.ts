import { Zero } from "@ethersproject/constants";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import useSWR from "swr";

import { useGasPrice } from "hooks";

export const useEstimateNetworkFee = (contract: Contract | null | undefined, methodName: string, inputs: any[]) => {
  const { chainId } = useWeb3React();
  const { gasPrice } = useGasPrice();

  const {
    data = Zero,
    isValidating,
    error,
  } = useSWR(contract && chainId ? `${chainId}/gasEstimation/${methodName}/${contract.address}` : null, async () => {
    const gasLimit = await contract!.estimateGas[methodName](...inputs);

    return gasPrice.mul(gasLimit);
  });

  return { gasEstimation: data, isValidating, error };
};

import { Zero } from "@ethersproject/constants";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import useSWR from "swr";

import { useGasPrice, useTokenContract } from "hooks";

export const useEstimateNetworkFee = (address: string | undefined, methodName: string, inputs: any[]) => {
  const { chainId } = useWeb3React();
  const { gasPrice } = useGasPrice();
  const contract = useTokenContract(address);

  const {
    data = Zero,
    isValidating,
    error,
  } = useSWR(
    contract && chainId && address ? `${chainId}/gasEstimation/${methodName}/${inputs}/${contract.address}` : null,
    async () => {
      const gasLimit = await (contract as Contract).estimateGas[methodName](...inputs);

      return gasPrice.mul(gasLimit);
    },
  );

  return { gasEstimation: data, isValidating, error };
};

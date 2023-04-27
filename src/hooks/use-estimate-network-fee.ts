import { Zero } from "@ethersproject/constants";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import useSWR from "swr";
import BigNumber from "bignumber.js";

import { useGasPrice, useNativeCurrency, useTokenContract } from "hooks";
/**
 * Used to calculate how much the user will spend in native currency using the contract method.
 * @param address ERC20 address
 * @param methodName contract method name
 * @param inputs contract method arguments
 * @returns Gas price multiplied by a gas limit
 */
export const useEstimateNetworkFee = (address: string | undefined, methodName: string, inputs: any[]) => {
  const { chainId } = useWeb3React();
  const { gasPrice } = useGasPrice();
  const contract = useTokenContract(address);
  const nativeCurrency = useNativeCurrency();

  const {
    data = Zero,
    isValidating,
    error,
  } = useSWR(
    contract && chainId && address ? `${chainId}/gasEstimation/${methodName}/${inputs}/${address}` : null,
    async () => {
      const gasLimit = await (contract as Contract).estimateGas[methodName](...inputs);

      return gasPrice.mul(gasLimit);
    },
  );

  return { gasEstimation: BigNumber(formatUnits(data, nativeCurrency?.decimals)), isValidating, error };
};

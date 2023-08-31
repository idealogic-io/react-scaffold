import { useWeb3React } from "@web3-react/core";
import { Zero } from "@ethersproject/constants";
import useSWR from "swr";

/**
 * @returns current gas price from a node
 */
export const useGasPrice = () => {
  const { provider } = useWeb3React();

  const { data = Zero, isValidating } = useSWR(provider ? `${typeof provider}/gasPrice` : null, async () => {
    return await provider!.getGasPrice();
  });

  return { gasPrice: data, isValidating };
};

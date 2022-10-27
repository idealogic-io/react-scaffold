import { useWeb3React } from "@web3-react/core";
import { Zero } from "@ethersproject/constants";
import useSWR from "swr";

import { getSimpleRpcProvider } from "utils/web3/simple-rpc";

export const useGasPrice = () => {
  const { chainId } = useWeb3React();

  const { data = Zero, isValidating } = useSWR(chainId ? `${chainId}/gasPrice` : null, async () => {
    const simpleRpcProvider = getSimpleRpcProvider(chainId!);

    return await simpleRpcProvider.getGasPrice();
  });

  return { gasPrice: data, isValidating };
};

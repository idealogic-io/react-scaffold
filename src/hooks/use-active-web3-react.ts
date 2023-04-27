import { useEffect, useState, useRef } from "react";
import { useWeb3React } from "@web3-react/core";

import { getSimpleRpcProvider } from "utils/web3";
import { Web3Provider } from "@ethersproject/providers";

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID as string;
/**
 * Is used to retrieve the active Web3 provider.
 * @returns rpc provider if provider from wallet is undefined, chainId as env constant if chainId is undefined, and other standard methods from useWeb3React
 */
export const useActiveWeb3React = () => {
  const { library, chainId, ...web3React } = useWeb3React();
  const refEth = useRef(library);
  const [provider, setProvider] = useState(library || getSimpleRpcProvider(+CHAIN_ID));

  useEffect(() => {
    if (library !== refEth.current) {
      setProvider(library || getSimpleRpcProvider(+CHAIN_ID));
      refEth.current = library;
    }
  }, [library]);

  return {
    library: provider as Web3Provider,
    chainId: chainId ?? parseInt(CHAIN_ID, 10),
    ...web3React,
  };
};

import { useWeb3React } from "@web3-react/core";
import { useEffect, useRef } from "react";

import { useQueryChainId, useSelectChain, isSupportedChain } from "configs/connectors";

export const useSyncChains = () => {
  const { chainId, isActive, account } = useWeb3React();
  const { parsedChainId, setQueryChainId, setDefaultQueryChainId } = useQueryChainId();
  const { selectChain } = useSelectChain();

  const chainIdRef = useRef(chainId);
  const accountRef = useRef(account);

  useEffect(() => {
    // Set default chain id to url if it is not presented
    if (!parsedChainId) {
      setDefaultQueryChainId();
    }
    // Or if presented and not valid
    if (parsedChainId && !isSupportedChain(parsedChainId)) {
      setDefaultQueryChainId();
    }
  }, [parsedChainId]);

  useEffect(() => {
    // Update chainIdRef when the account is retrieved from Web3React
    if (account && account !== accountRef.current) {
      chainIdRef.current = chainId;
      accountRef.current = account;
    }
  }, [account, chainId]);

  useEffect(() => {
    // Change a user's chain on pageload if the connected chainId does not match the query param chain
    if (isActive && parsedChainId && chainIdRef.current === chainId && chainId !== parsedChainId) {
      selectChain(parsedChainId);
    }
    // If a user has a connected wallet and has manually changed their chain, update the query parameter if it's supported
    else if (account && chainIdRef.current !== chainId && chainId !== parsedChainId) {
      if (chainId && isSupportedChain(chainId)) {
        setQueryChainId(chainId);
      } else {
        setDefaultQueryChainId();
      }
    }
    // If a user has a connected wallet and the chainId matches the query param chain, update the chainIdRef
    else if (isActive && chainId === parsedChainId) {
      chainIdRef.current = parsedChainId;
    }
  }, [parsedChainId, isActive, chainId, account]);
};

import { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";

import { ChainId } from "../types";

export const useBlockNumber = () => {
  const { mutate } = useSWRConfig();
  const { chainId, provider } = useWeb3React();

  const onInitialBlockChange = (chainId: ChainId, blockNumber: number) => {
    mutate(`${chainId}/initialBlockNumber`, blockNumber);
  };

  const onBlockChange = (chainId: ChainId, blockNumber: number) => {
    mutate(`${chainId}/blockNumber`, blockNumber);
  };

  useEffect(() => {
    let stale = false;

    if (provider && chainId) {
      provider
        .getBlockNumber()
        .then(block => {
          if (!stale) {
            onInitialBlockChange(chainId, block);
          }
        })
        .catch(error => {
          console.error(`Failed to get block number for chainId ${chainId}`, error);
        });

      const onBlock = (block: number) => onBlockChange(chainId, block);

      provider.on("block", onBlock);

      return () => {
        stale = true;
        provider.removeListener("block", onBlock);
      };
    }
  }, [chainId, provider]);
};
/**
 * Returns current block number
 */
export const useCurrentBlock = () => {
  const { chainId } = useWeb3React();

  const { data: currentBlock = 0 } = useSWRImmutable(`${chainId}/blockNumber`);
  return currentBlock;
};
/**
 * Returns initial block number when user started the interaction with platform
 */
export const useInitialBlock = () => {
  const { chainId } = useWeb3React();

  const { data: initialBlock = 0 } = useSWRImmutable(`${chainId}/initialBlockNumber`);
  return initialBlock;
};

import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { useWeb3React } from "@web3-react/core";

import { getSimpleRpcProvider } from "utils/web3/simple-rpc";

const REFRESH_BLOCK_INTERVAL = 6000;
/**
 * Determines what block number is active right now. Updates every 6000 ms.
 */
export const usePollBlockNumber = () => {
  const { cache, mutate } = useSWRConfig();
  const { chainId } = useWeb3React();

  useSWR(
    chainId ? `${chainId}/blockNumber` : null,
    async () => {
      const simpleRpcProvider = getSimpleRpcProvider(chainId!);

      const blockNumber = await simpleRpcProvider.getBlockNumber();

      if (!cache.get(`${chainId}/initialBlockNumber`)) {
        mutate(`${chainId}/initialBlockNumber`, blockNumber);
      }

      return blockNumber;
    },
    {
      refreshInterval: REFRESH_BLOCK_INTERVAL,
    },
  );
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

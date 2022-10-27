import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { useWeb3React } from "@web3-react/core";

import { FAST_INTERVAL, SLOW_INTERVAL } from "configs";
import { getSimpleRpcProvider } from "utils/web3/simple-rpc";

const REFRESH_BLOCK_INTERVAL = 6000;

export const usePollBlockNumber = () => {
  const { cache, mutate } = useSWRConfig();
  const { chainId } = useWeb3React();

  const { data = 0 } = useSWR(
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

  useSWR(
    [FAST_INTERVAL, `${chainId}/blockNumber`],
    async () => {
      return data;
    },
    {
      refreshInterval: FAST_INTERVAL,
    },
  );

  useSWR(
    [SLOW_INTERVAL, `${chainId}/blockNumber`],
    async () => {
      return data;
    },
    {
      refreshInterval: SLOW_INTERVAL,
    },
  );
};

export const useCurrentBlock = (): number => {
  const { chainId } = useWeb3React();

  const { data: currentBlock = 0 } = useSWRImmutable(`${chainId}/blockNumber`);
  return currentBlock;
};

export const useInitialBlock = (): number => {
  const { chainId } = useWeb3React();

  const { data: initialBlock = 0 } = useSWRImmutable(`${chainId}/initialBlockNumber`);
  return initialBlock;
};

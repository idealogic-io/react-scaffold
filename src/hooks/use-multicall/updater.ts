import { useEffect, useMemo, useRef } from "react";
import { useWeb3React } from "@web3-react/core";

import { CancelledError, retry } from "./retry";
import chunkArray, { activeListeningKeys, fetchChunk, outdatedListeningKeys, parseCallKey } from "./helpers";
import { CALL_CHUNK_SIZE } from "./constants";

import {
  errorFetchingMulticallResults,
  fetchingMulticallResults,
  updateMulticallResults,
} from "store/reducers/multicall/action";
import { useAppDispatch, useAppSelector } from "store/store";

import { useDebounce, useMulticallContract, useCurrentBlock } from "hooks";

export const useMulticallUpdater = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(s => s.multicall);
  // wait for listeners to settle before triggering updates
  const debouncedListeners = useDebounce(state.callListeners, 100);
  const currentBlock = useCurrentBlock();
  const { chainId } = useWeb3React();
  const multicallContract = useMulticallContract(chainId);
  const cancellations = useRef<{ blockNumber: number; cancellations: (() => void)[] }>();

  const listeningKeys: { [callKey: string]: number } = useMemo(() => {
    return activeListeningKeys(debouncedListeners, chainId);
  }, [debouncedListeners, chainId]);

  const unserializedOutdatedCallKeys = useMemo(() => {
    return outdatedListeningKeys(state.callResults, listeningKeys, chainId, currentBlock);
  }, [chainId, state.callResults, listeningKeys, currentBlock]);

  const serializedOutdatedCallKeys = useMemo(
    () => JSON.stringify(unserializedOutdatedCallKeys.sort()),
    [unserializedOutdatedCallKeys],
  );

  useEffect(() => {
    if (!currentBlock || !chainId || !multicallContract) return;

    const outdatedCallKeys: string[] = JSON.parse(serializedOutdatedCallKeys);
    if (outdatedCallKeys.length === 0) return;
    const calls = outdatedCallKeys.map(key => parseCallKey(key));

    const chunkedCalls = chunkArray(calls, CALL_CHUNK_SIZE);

    if (cancellations.current?.blockNumber !== currentBlock) {
      cancellations.current?.cancellations?.forEach(c => c());
    }

    dispatch(
      fetchingMulticallResults({
        calls,
        chainId,
        fetchingBlockNumber: currentBlock,
      }),
    );

    cancellations.current = {
      blockNumber: currentBlock,
      cancellations: chunkedCalls.map((chunk, index) => {
        const { cancel, promise } = retry(() => fetchChunk(multicallContract, chunk, currentBlock), {
          n: Infinity,
          minWait: 2500,
          maxWait: 3500,
        });
        promise
          .then(({ results: returnData, blockNumber: fetchBlockNumber }) => {
            cancellations.current = { cancellations: [], blockNumber: currentBlock };

            // accumulates the length of all previous indices
            const firstCallKeyIndex = chunkedCalls
              .slice(0, index)
              .reduce<number>((memo, curr) => memo + curr.length, 0);
            const lastCallKeyIndex = firstCallKeyIndex + returnData.length;

            dispatch(
              updateMulticallResults({
                chainId,
                results: outdatedCallKeys
                  .slice(firstCallKeyIndex, lastCallKeyIndex)
                  .reduce<{ [callKey: string]: string | null }>((memo, callKey, i) => {
                    memo[callKey] = returnData[i] ?? null;
                    return memo;
                  }, {}),
                blockNumber: fetchBlockNumber,
              }),
            );
          })
          .catch((error: any) => {
            if (error instanceof CancelledError) {
              console.debug("Cancelled fetch for blockNumber", currentBlock);
              return;
            }
            console.error("Failed to fetch multicall chunk", chunk, chainId, error);
            dispatch(
              errorFetchingMulticallResults({
                calls: chunk,
                chainId,
                fetchingBlockNumber: currentBlock,
              }),
            );
          });
        return cancel;
      }),
    };
  }, [chainId, multicallContract, dispatch, serializedOutdatedCallKeys, currentBlock]);
};

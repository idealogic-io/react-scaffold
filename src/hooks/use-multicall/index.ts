import { Contract } from "@ethersproject/contracts";
import { useEffect, useMemo } from "react";
import { useSWRConfig } from "swr";
import { useWeb3React } from "@web3-react/core";

import { Call, CallResult, CallState, ListenerOptions, OptionalMethodInputs } from "./types";
import { isValidMethodArgs, parseCallKey, toCallKey, toCallState } from "./helpers";

import { useAppSelector, useAppDispatch } from "store/store";
import { addMulticallListeners, removeMulticallListeners } from "store/reducers/multicall/action";
import { INVALID_RESULT } from "./constants";

// the lowest level call for subscribing to contract data
function useCallsData(calls: (Call | undefined)[], options?: ListenerOptions): CallResult[] {
  const { chainId } = useWeb3React();
  const callResults = useAppSelector(state => state.multicall.callResults);
  const dispatch = useAppDispatch();

  const serializedCallKeys: string = useMemo(
    () =>
      JSON.stringify(
        calls
          ?.filter((c): c is Call => Boolean(c))
          ?.map(toCallKey)
          ?.sort() ?? [],
      ),
    [calls],
  );

  // update listeners when there is an actual change that persists for at least 100ms
  useEffect(() => {
    const callKeys: string[] = JSON.parse(serializedCallKeys);

    if (!chainId || callKeys.length === 0) {
      return undefined;
    }

    const calls = callKeys.map(key => parseCallKey(key));

    dispatch(
      addMulticallListeners({
        chainId,
        calls,
        options,
      }),
    );

    return () => {
      dispatch(
        removeMulticallListeners({
          chainId,
          calls,
          options,
        }),
      );
    };
  }, [chainId, dispatch, options, serializedCallKeys]);

  return useMemo(
    () =>
      calls.map<CallResult>(call => {
        if (!chainId || !call) {
          return INVALID_RESULT;
        }

        const result = callResults[chainId]?.[toCallKey(call)];

        let data;
        if (result?.data && result?.data !== "0x") {
          data = result.data;
        }

        return { valid: true, data, blockNumber: result?.blockNumber };
      }),
    [callResults, calls, chainId],
  );
}

export function useSingleCallResult(
  contract: Contract | null | undefined,
  methodName: string,
  inputs?: OptionalMethodInputs,
  options?: ListenerOptions,
): CallState {
  const { chainId } = useWeb3React();
  const fragment = useMemo(() => contract?.interface?.getFunction(methodName), [contract, methodName]);

  const calls = useMemo<Call[]>(() => {
    return contract && fragment && isValidMethodArgs(inputs)
      ? [
          {
            address: contract.address,
            callData: contract.interface.encodeFunctionData(fragment, inputs),
          },
        ]
      : [];
  }, [contract, fragment, inputs]);

  const result = useCallsData(calls, options)[0];
  const { cache } = useSWRConfig();

  return useMemo(() => {
    const currentBlockNumber = cache.get(`${chainId}/blockNumber`);

    return toCallState(result, contract?.interface, fragment, currentBlockNumber);
  }, [cache, result, contract?.interface, fragment]);
}

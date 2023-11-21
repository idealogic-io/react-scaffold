import { Contract } from "@ethersproject/contracts";
import { Interface } from "@ethersproject/abi";
import { useEffect, useMemo } from "react";
import { Cache, useSWRConfig } from "swr";
import { useWeb3React } from "@web3-react/core";

import { Call, CallResult, CallState, ListenerOptions, OptionalMethodInputs } from "./types";
import { isValidMethodArgs, parseCallKey, toCallKey, toCallState } from "./helpers";

import { useAppSelector, useAppDispatch } from "store/store";
import { addMulticallListeners, removeMulticallListeners } from "store/multicall/action";
import { INVALID_RESULT } from "./constants";
import { ContractMethodName } from "configs/web3/hooks/use-swr-contract/types";

/**
 * The lowest level call for subscribing to contract data
 */
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
/**
 * Is used to execute a read-only single function call on a smart contract
 */
export function useSingleCallResult<
  C extends Contract,
  M extends ContractMethodName<C>,
  I extends Parameters<C["callStatic"][M]>,
>(contract: C | null | undefined, methodName: M, inputs?: I, options?: ListenerOptions): CallState {
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
    const currentBlockNumber = (cache as Cache<number>).get(`${chainId}/blockNumber`)?.data;

    return toCallState(result, contract?.interface, fragment, currentBlockNumber);
  }, [cache, result, contract?.interface, fragment]);
}
/**
 * Is used to fetch data from multiple smart contracts for a single function call
 */
export function useMultipleContractSingleData(
  addresses: (string | undefined)[],
  contractInterface: Interface,
  methodName: string,
  callInputs?: OptionalMethodInputs,
  options?: ListenerOptions,
): CallState[] {
  const { chainId } = useWeb3React();
  const fragment = useMemo(() => contractInterface.getFunction(methodName), [contractInterface, methodName]);

  const callData: string | undefined = useMemo(
    () =>
      fragment && isValidMethodArgs(callInputs)
        ? contractInterface.encodeFunctionData(fragment, callInputs)
        : undefined,
    [callInputs, contractInterface, fragment],
  );

  const calls = useMemo(
    () =>
      fragment && addresses && addresses.length > 0 && callData
        ? addresses.map<Call | undefined>(address => {
            return address && callData
              ? {
                  address,
                  callData,
                }
              : undefined;
          })
        : [],
    [addresses, callData, fragment],
  );

  const results = useCallsData(calls, options);

  const { cache } = useSWRConfig();

  return useMemo(() => {
    const currentBlockNumber = (cache as Cache<number>).get(`${chainId}/blockNumber`)?.data;

    return results.map(result => toCallState(result, contractInterface, fragment, currentBlockNumber));
  }, [fragment, results, contractInterface, cache]);
}
/**
 * is used to fetch multiple data from a single smart contract
 */
export function useSingleContractMultipleData(
  contract: Contract | null | undefined,
  methodName: string,
  callInputs: OptionalMethodInputs[],
  options?: ListenerOptions,
): CallState[] {
  const { chainId } = useWeb3React();
  const fragment = useMemo(() => contract?.interface?.getFunction(methodName), [contract, methodName]);

  const calls = useMemo(
    () =>
      contract && fragment && callInputs && callInputs.length > 0
        ? callInputs.map<Call>(inputs => {
            return {
              address: contract.address,
              callData: contract.interface.encodeFunctionData(fragment, inputs),
            };
          })
        : [],
    [callInputs, contract, fragment],
  );

  const results = useCallsData(calls, options);

  const { cache } = useSWRConfig();

  return useMemo(() => {
    const currentBlockNumber = (cache as Cache<number>).get(`${chainId}/blockNumber`)?.data;
    return results.map(result => toCallState(result, contract?.interface, fragment, currentBlockNumber));
  }, [fragment, contract, results, cache]);
}

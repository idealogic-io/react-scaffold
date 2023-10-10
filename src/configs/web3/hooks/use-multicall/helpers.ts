import { Interface, FunctionFragment } from "@ethersproject/abi";
import { Contract } from "@ethersproject/contracts";
import { AppState } from "store/store";
import { ADDRESS_REGEX, LOWER_HEX_REGEX, INVALID_CALL_STATE, LOADING_CALL_STATE } from "./constants";
import { RetryableError } from "./retry";
import { Call, CallResult, CallState, MethodArg, MethodArgs, Result } from "./types";

export function toCallKey(call: Call): string {
  if (!ADDRESS_REGEX.test(call.address)) {
    throw new Error(`Invalid address: ${call.address}`);
  }

  if (!LOWER_HEX_REGEX.test(call.callData)) {
    throw new Error(`Invalid hex: ${call.callData}`);
  }

  return `${call.address}-${call.callData}`;
}

export function parseCallKey(callKey: string): Call {
  const pcs = callKey.split("-");

  if (pcs.length !== 2) {
    throw new Error(`Invalid call key: ${callKey}`);
  }

  return {
    address: pcs[0],
    callData: pcs[1],
  };
}

export function isMethodArg(x: unknown): x is MethodArg {
  return ["string", "number"].indexOf(typeof x) !== -1;
}

export function isValidMethodArgs(x: unknown): x is MethodArgs | undefined {
  return (
    x === undefined ||
    (Array.isArray(x) && x.every(xi => isMethodArg(xi) || (Array.isArray(xi) && xi.every(isMethodArg))))
  );
}

// chunks array into chunks of maximum size
// evenly distributes items among the chunks
export default function chunkArray<T>(items: T[], maxChunkSize: number): T[][] {
  if (maxChunkSize < 1) throw new Error("maxChunkSize must be gte 1");
  if (items.length <= maxChunkSize) return [items];

  const numChunks: number = Math.ceil(items.length / maxChunkSize);
  const chunkSize = Math.ceil(items.length / numChunks);

  return [...Array(numChunks).keys()].map(ix => items.slice(ix * chunkSize, ix * chunkSize + chunkSize));
}

export const toCallState = (
  callResult: CallResult | undefined,
  contractInterface: Interface | undefined,
  fragment: FunctionFragment | undefined,
  latestBlockNumber: number | undefined,
): CallState => {
  if (!callResult) {
    return INVALID_CALL_STATE;
  }

  const { valid, data, blockNumber } = callResult;

  if (!valid) {
    return INVALID_CALL_STATE;
  }

  if (valid && !blockNumber) {
    return LOADING_CALL_STATE;
  }

  if (!contractInterface || !fragment || !latestBlockNumber) {
    return LOADING_CALL_STATE;
  }

  const success = data && data.length > 2;
  const syncing = (blockNumber ?? 0) < latestBlockNumber;

  let result: Result | undefined;
  if (success && data) {
    try {
      result = contractInterface.decodeFunctionResult(fragment, data);
    } catch (error) {
      console.debug("Result data parsing failed", fragment, data);
      return {
        valid: true,
        loading: false,
        error: true,
        syncing,
        result,
      };
    }
  }

  return {
    valid: true,
    loading: false,
    syncing,
    result,
    error: !success,
  };
};

/**
 * Fetches a chunk of calls, enforcing a minimum block number constraint
 * @param multicallContract multicall contract to fetch against
 * @param chunk chunk of calls to make
 * @param minBlockNumber minimum block number of the result set
 */
export const fetchChunk = async (
  multicallContract: Contract,
  chunk: Call[],
  minBlockNumber: number,
): Promise<{ results: string[]; blockNumber: number }> => {
  console.debug("Fetching chunk", multicallContract, chunk, minBlockNumber);
  let resultsBlockNumber;
  let returnData;

  try {
    [resultsBlockNumber, returnData] = await multicallContract.callStatic.aggregate(
      chunk.map(obj => [obj.address, obj.callData]),
      {
        blockTag: minBlockNumber,
      },
    );
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error = err as any;
    if (
      error.code === -32000 ||
      (error?.data?.message && error?.data?.message?.indexOf("header not found") !== -1) ||
      error.message?.indexOf("header not found") !== -1
    ) {
      throw new RetryableError(`header not found for block number ${minBlockNumber}`);
    } else if (error.code === -32603 || error.message?.indexOf("execution ran out of gas") !== -1) {
      if (chunk.length > 1) {
        if (process.env.NODE_ENV === "development") {
          console.debug("Splitting a chunk in 2", chunk);
        }
        const half = Math.floor(chunk.length / 2);
        const [c0, c1] = await Promise.all([
          fetchChunk(multicallContract, chunk.slice(0, half), minBlockNumber),
          fetchChunk(multicallContract, chunk.slice(half, chunk.length), minBlockNumber),
        ]);
        return {
          results: c0.results.concat(c1.results),
          blockNumber: c1.blockNumber,
        };
      }
    }
    console.debug("Failed to fetch chunk inside retry", error);
    throw error;
  }
  if (resultsBlockNumber.toNumber() < minBlockNumber) {
    console.debug(`Fetched results for old block number: ${resultsBlockNumber.toString()} vs. ${minBlockNumber}`);
  }
  return { results: returnData, blockNumber: resultsBlockNumber.toNumber() };
};

/**
 * From the current all listeners state, return each call key mapped to the
 * minimum number of blocks per fetch. This is how often each key must be fetched.
 * @param allListeners the all listeners state
 * @param chainId the current chain id
 */
export const activeListeningKeys = (
  allListeners: AppState["multicall"]["callListeners"],
  chainId?: number,
): { [callKey: string]: number } => {
  if (!allListeners || !chainId) return {};
  const listeners = allListeners[chainId];
  if (!listeners) return {};

  return Object.keys(listeners).reduce<{ [callKey: string]: number }>((memo, callKey) => {
    const keyListeners = listeners[callKey];

    memo[callKey] = Object.keys(keyListeners)
      .filter(key => {
        const blocksPerFetch = parseInt(key);
        if (blocksPerFetch <= 0) return false;
        return keyListeners[blocksPerFetch] > 0;
      })
      .reduce((previousMin, current) => {
        return Math.min(previousMin, parseInt(current));
      }, Infinity);
    return memo;
  }, {});
};

/**
 * Return the keys that need to be refetched
 * @param callResults current call result state
 * @param listeningKeys each call key mapped to how old the data can be in blocks
 * @param chainId the current chain id
 * @param currentBlock the latest block number
 */
export const outdatedListeningKeys = (
  callResults: AppState["multicall"]["callResults"],
  listeningKeys: { [callKey: string]: number },
  chainId: number | undefined,
  currentBlock: number | undefined,
): string[] => {
  if (!chainId || !currentBlock) return [];
  const results = callResults[chainId];
  // no results at all, load everything
  if (!results) return Object.keys(listeningKeys);

  return Object.keys(listeningKeys).filter(callKey => {
    const blocksPerFetch = listeningKeys[callKey];

    const data = callResults[chainId][callKey];
    // no data, must fetch
    if (!data) return true;

    const minDataBlockNumber = currentBlock - (blocksPerFetch - 1);

    // already fetching it for a recent enough block, don't refetch it
    if (data.fetchingBlockNumber && data.fetchingBlockNumber >= minDataBlockNumber) return false;

    // if data is older than minDataBlockNumber, fetch it
    return !data.blockNumber || data.blockNumber < minDataBlockNumber;
  });
};

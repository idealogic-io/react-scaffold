import { CallResult, CallState, ListenerOptions } from "./types";

// chunk calls so we do not exceed the gas limit
export const CALL_CHUNK_SIZE = 500;

export const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
export const LOWER_HEX_REGEX = /^0x[a-f0-9]*$/;

export const INVALID_RESULT: CallResult = { valid: false, blockNumber: undefined, data: undefined };

// use this options object
export const NEVER_RELOAD: ListenerOptions = {
  blocksPerFetch: Infinity,
};

export const INVALID_CALL_STATE: CallState = {
  valid: false,
  result: undefined,
  loading: false,
  syncing: false,
  error: false,
};
export const LOADING_CALL_STATE: CallState = {
  valid: true,
  result: undefined,
  loading: true,
  syncing: true,
  error: false,
};

import { Contract } from "@ethersproject/contracts";
import { FormatTypes } from "@ethersproject/abi";
import { ContractMethodName, UseSWRContractKey, UseSWRContractSerializeKeys } from "./types";

export const getContractKey = <T extends Contract = Contract, N extends ContractMethodName<T> = string>(
  key?: UseSWRContractKey<T, N> | null,
) => {
  if (Array.isArray(key)) {
    const [contract, methodName, params] = key || [];
    return {
      contract,
      methodName,
      params,
    };
  }
  return key;
};

export const serializesContractKey = <T extends Contract = Contract>(
  key?: UseSWRContractKey<T> | null,
): UseSWRContractSerializeKeys | null => {
  const { contract, methodName, params } = getContractKey(key) || {};
  const serializedKeys =
    key && contract && methodName
      ? {
          address: contract.address,
          interfaceFormat: contract.interface.format(FormatTypes.full) as string[],
          methodName,
          callData: contract.interface.encodeFunctionData(methodName, params),
        }
      : null;
  return serializedKeys;
};

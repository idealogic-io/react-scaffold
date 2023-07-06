import { Contract } from "@ethersproject/contracts";

export type MaybeContract<C extends Contract = Contract> = C | null | undefined;
export type ContractMethodName<C extends Contract = Contract> = keyof C["callStatic"] & string;

export type ContractMethodParams<
  C extends Contract = Contract,
  N extends ContractMethodName<C> = ContractMethodName<C>,
> = Parameters<C["callStatic"][N]>;

type UseSWRContractArrayKey<C extends Contract = Contract, N extends ContractMethodName<C> = string> =
  | [MaybeContract<C>, N, ContractMethodParams<C, N>]
  | [MaybeContract<C>, N];

export type UseSWRContractObjectKey<
  C extends Contract = Contract,
  N extends ContractMethodName<C> = ContractMethodName<C>,
> = {
  contract: MaybeContract<C>;
  methodName: N;
  params?: ContractMethodParams<C, N>;
};

export type UseSWRContractKey<T extends Contract = Contract, N extends ContractMethodName<T> = string> =
  | UseSWRContractArrayKey<T, N>
  | UseSWRContractObjectKey<T, N>;

export type UseSWRContractSerializeKeys = {
  address: string;
  interfaceFormat: string[];
  methodName: string;
  callData: string;
};

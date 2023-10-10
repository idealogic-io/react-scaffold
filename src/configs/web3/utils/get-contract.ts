import { AddressZero } from "@ethersproject/constants";
import { Contract, ContractInterface } from "@ethersproject/contracts";
import { JsonRpcProvider } from "@ethersproject/providers";

import { isAddress } from "configs/web3";

// account is optional

export function getContract(address: string, ABI: ContractInterface, provider: JsonRpcProvider, account?: string) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(provider, account));
}
// account is not optional
export const getSigner = (provider: JsonRpcProvider, account: string) => {
  return provider.getSigner(account).connectUnchecked();
};
// account is optional
export const getProviderOrSigner = (provider: JsonRpcProvider, account?: string) => {
  return account ? getSigner(provider, account) : provider;
};

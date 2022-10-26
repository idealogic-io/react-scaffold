import { Contract, ContractInterface } from "@ethersproject/contracts";

import type { Signer } from "@ethersproject/abstract-signer";
import type { Provider } from "@ethersproject/providers";
import { AddressZero } from "@ethersproject/constants";

import erc20Abi from "configs/abi/erc20.json";

import { getChainIds } from "configs/networks";

import { getSimpleRpcProvider } from "./simple-rpc";
import { isAddress } from "./string-helpers";

export const getContract = (
  address: string,
  abi: ContractInterface,
  signer: Signer | Provider | null,
  chainId: number,
) => {
  const signerOrProvider = signer ?? getSimpleRpcProvider(chainId);

  return new Contract(address, abi, signerOrProvider);
};

export const getERC20Contract = (address: string, signer: Signer | Provider | null, chainId: number) => {
  return getContract(address, erc20Abi, signer, chainId);
};

export const getAddress = (address: { [key: number]: string }, chainId: number | undefined) => {
  const chainIds = getChainIds();

  if (!chainId) {
    throw new Error("Invalid chain id");
  }

  if (!chainIds.includes(chainId)) {
    throw new Error("Unsupported chain id");
  }

  if (!address[chainId].length) {
    throw new Error("Contract is not deployed");
  }

  if (!isAddress(address[chainId]) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address[chainId]}'.`);
  }

  return address[chainId];
};

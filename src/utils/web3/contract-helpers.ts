import { Contract, ContractInterface } from "@ethersproject/contracts";

import type { Signer } from "@ethersproject/abstract-signer";
import type { Provider } from "@ethersproject/providers";

import courseMarketplaceAbi from "configs/abi/CourseMarketplace.json";
import erc20Abi from "configs/abi/ERC20.json";

import { contractsAddresses } from "configs";
import { getChainIds } from "configs/networks";

import { getSimpleRpcProvider } from "./simple-rpc";

export const getContract = (address: string, abi: ContractInterface, signer?: Signer | Provider, chainId?: number) => {
  const signerOrProvider = signer ?? getSimpleRpcProvider(chainId);

  return new Contract(address, abi, signerOrProvider);
};

export const getCourseMarketplaceContract = (signer?: Signer | Provider, chainId?: number) => {
  return getContract(getAddress(contractsAddresses.courseMarketplace, chainId), courseMarketplaceAbi, signer, chainId);
};

export const getERC20Contract = (address: string, signer?: Signer | Provider, chainId?: number) => {
  return getContract(address, erc20Abi, signer, chainId);
};

export const getAddress = (address: { [key: number]: string }, chainId?: number) => {
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

  return address[chainId];
};

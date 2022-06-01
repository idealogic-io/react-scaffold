import { Contract, ContractInterface } from "@ethersproject/contracts";
import { simpleRpcProvider } from "./simple-rpc";
import { getChainId } from "./web3-react";

import type { Signer } from "@ethersproject/abstract-signer";
import type { Provider } from "@ethersproject/providers";

import courseMarketplaceAbi from "configs/abi/CourseMarketplace.json";
import { contractsAddresses } from "configs";

import { Address } from "./types";

export const getContract = (address: string, abi: ContractInterface, signer?: Signer | Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider;

  return new Contract(address, abi, signerOrProvider);
};

export const getCourseMarketplaceContract = (signer?: Signer | Provider) => {
  return getContract(getAddress(contractsAddresses.courseMarketplace), courseMarketplaceAbi, signer);
};

export const getAddress = (address: Address) => {
  const chainId = getChainId();
  return address[chainId];
};

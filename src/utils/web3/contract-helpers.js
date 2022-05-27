import { Contract } from "@ethersproject/contracts";
import { simpleRpcProvider } from "./simple-rpc";
import { CHAIN_ID, getChainId } from "./web3-react";

import courseMarketplaceAbi from "configs/abi/CourseMarketplace.json";
import { contractsAddresses } from "configs";

export const getContract = (address, abi, signer) => {
  const signerOrProvider = signer ?? simpleRpcProvider;

  return new Contract(address, abi, signerOrProvider);
};

export const getAddress = address => {
  const chainId = getChainId();
  return address[chainId] ? address[chainId] : address[CHAIN_ID.MAINNET];
};

export const getCourseMarketplaceContract = signer => {
  return getContract(getAddress(contractsAddresses.courseMarketplace), courseMarketplaceAbi, signer);
};

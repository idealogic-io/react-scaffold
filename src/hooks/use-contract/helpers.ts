import { Contract, ContractInterface } from "@ethersproject/contracts";
import { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import { getSimpleRpcProvider } from "utils/web3";
/**
 * @returns contract
 */
export const getContract = (
  address: string,
  abi: ContractInterface,
  signer: Signer | Provider | null,
  chainId: number,
) => {
  const signerOrProvider = signer ?? getSimpleRpcProvider(chainId);

  return new Contract(address, abi, signerOrProvider);
};

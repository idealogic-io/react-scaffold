import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { rpcUrls } from "configs";

export const getSimpleRpcProvider = (chainId: number) => {
  return new StaticJsonRpcProvider(rpcUrls[chainId], chainId);
};

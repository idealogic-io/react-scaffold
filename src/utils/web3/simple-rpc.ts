import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { rpcUrls } from "configs";

export const getSimpleRpcProvider = (chainId?: number) => {
  const _chainIdd = chainId ?? 1;

  return new StaticJsonRpcProvider(rpcUrls[_chainIdd]);
};

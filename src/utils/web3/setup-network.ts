import { ExternalProvider } from "@ethersproject/providers";
import { toast } from "react-toastify";

import { chainNames, networks, toastError } from "configs";

interface SwitchError extends Error {
  code?: number;
}
// TODO translate page here
export const setupNetwork = async (externalProvider?: ExternalProvider, chainId?: number) => {
  const provider = externalProvider || window.ethereum;

  if (!chainId) {
    toast.error("Network is not defined", toastError);

    return false;
  }

  const network = networks[chainId];

  if (provider && provider.request) {
    try {
      await provider?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      return true;
    } catch (switchError) {
      if ((switchError as SwitchError)?.code === 4902) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [{ ...network, chainId: `0x${network.chainId.toString(16)}` }],
          });
          return true;
        } catch (error) {
          console.error(`Failed to setup the network in Metamask: ${(error as Error).message}`);
          return false;
        }
      }

      return false;
    }
  } else {
    toast.error(
      `Can't setup the ${chainNames[chainId]} network on metamask because window.ethereum is undefined`,
      toastError,
    );
    return false;
  }
};

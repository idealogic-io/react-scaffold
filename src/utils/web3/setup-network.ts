import { ExternalProvider } from "@ethersproject/providers";
import { toast } from "react-toastify";

import { chainNames, networks } from "configs";
import { toastOptionsError } from "components";
import { TranslateFunction } from "context/language-context/types";

interface SwitchError extends Error {
  code?: number;
}

export const setupNetwork = async (t: TranslateFunction, provider?: ExternalProvider, chainId?: number) => {
  if (!chainId) {
    toast.error(t("Network is not defined"), toastOptionsError);

    return false;
  }

  const network = networks[chainId];

  if (provider && provider.request) {
    try {
      await provider.request({
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
          console.error(`Failed to setup the network in wallet: `, error);
          return false;
        }
      }
      return false;
    }
  } else {
    console.error(t("Couldn't setup the %network% network", { network: chainNames[chainId] }));
    return false;
  }
};

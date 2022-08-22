import { ExternalProvider } from "@ethersproject/providers";
import { chainNames, getChainIds, networks } from "configs";

interface SwitchError extends Error {
  code?: number;
}

export const setupNetwork = async (externalProvider?: ExternalProvider, chainId?: number) => {
  const provider = externalProvider || window.ethereum;
  const chainIds = getChainIds();

  if (!chainId) {
    // TODO add UI
    console.error("Invalid chain id");
    return false;
  }

  if (!chainIds.includes(chainId)) {
    // TODO add UI
    console.error("Unsupported chain id");
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
          console.error("Failed to setup the network in Metamask:", error);
          return false;
        }
      } else if ((switchError as { code?: number })?.code === -32002) {
        // TODO add UI
        console.error("Please check metamask, request already pending.");
      } else {
        // TODO add UI
        console.error((switchError as SwitchError)?.message);
      }
      return false;
    }
  } else {
    console.error(`Can't setup the ${chainNames[chainId]} network on metamask because window.ethereum is undefined`);
    return false;
  }
};

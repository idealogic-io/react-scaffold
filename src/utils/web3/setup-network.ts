import { ExternalProvider } from "@ethersproject/providers";
import { ChainId, scanUrl, CHAIN_ID_TO_NAME, getChainId, CURRENCY, CURRENCY_DECIMAL, getRpcUrl } from "./web3-react";

interface SwitchError extends Error {
  code?: number;
}

const NETWORK_CONFIG = {
  [ChainId.Mainnet]: {
    name: CHAIN_ID_TO_NAME[ChainId.Mainnet],
    scanURL: scanUrl[ChainId.Mainnet],
  },
  [ChainId.Testnet]: {
    name: CHAIN_ID_TO_NAME[ChainId.Testnet],
    scanURL: scanUrl[ChainId.Testnet],
  },
};

export const setupNetwork = async (externalProvider?: ExternalProvider) => {
  const provider = externalProvider || window.ethereum;
  const chainId = getChainId();

  if (!NETWORK_CONFIG[chainId]) {
    // TODO add UI
    console.error("Invalid chain id");
    return false;
  }
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
            params: [
              {
                chainId: `0x${chainId.toString(16)}`,
                chainName: NETWORK_CONFIG[chainId].name,
                nativeCurrency: {
                  name: CURRENCY,
                  symbol: CURRENCY,
                  decimals: CURRENCY_DECIMAL,
                },
                rpcUrls: [`${getRpcUrl()}/`],
                blockExplorerUrls: [`${NETWORK_CONFIG[chainId].scanURL}/`],
              },
            ],
          });
          return true;
        } catch (error) {
          console.error("Failed to setup the network in Metamask:", error);
          return false;
        }
      } else if (switchError?.code === -32002) {
        // TODO add UI
        console.error("Please check metamask, request already pending.");
      } else {
        // TODO add UI
        console.error(`Sorry, can't add ${NETWORK_CONFIG[chainId].name}. Please add it manually.`);
      }
      return false;
    }
  } else {
    console.error(
      `Can't setup the ${NETWORK_CONFIG[chainId].name} network on metamask because window.ethereum is undefined`,
    );
    return false;
  }
};

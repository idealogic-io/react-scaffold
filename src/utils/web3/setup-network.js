import { CHAIN_ID, chainRpc, scanUrl, CHAIN_ID_TO_NAME, getChainId, CURRENCY, CURRENCY_DECIMAL } from "./web3-react";

const NETWORK_CONFIG = {
  [CHAIN_ID.MAINNET]: {
    name: CHAIN_ID_TO_NAME[CHAIN_ID.MAINNET],
    scanURL: scanUrl[CHAIN_ID.MAINNET],
    rpcUrl: chainRpc[CHAIN_ID.MAINNET],
  },
  [CHAIN_ID.TESTNET]: {
    name: CHAIN_ID_TO_NAME[CHAIN_ID.TESTNET],
    scanURL: scanUrl[CHAIN_ID.TESTNET],
    rpcUrl: chainRpc[CHAIN_ID.TESTNET],
  },
};

export const setupNetwork = async externalProvider => {
  const provider = externalProvider || window.ethereum;
  const chainId = getChainId();

  if (!NETWORK_CONFIG[chainId]) {
    console.error("Invalid chain id");
    return false;
  }
  if (provider) {
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      return true;
    } catch (switchError) {
      if (switchError?.code === 4902) {
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
                rpcUrls: [`${NETWORK_CONFIG[chainId].rpcUrl}/`],
                blockExplorerUrls: [`${NETWORK_CONFIG[chainId].scanURL}/`],
              },
            ],
          });
          return true;
        } catch (error) {
          console.error("Failed to setup the network in Metamask:", error);
          return false;
        }
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

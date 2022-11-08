import { useEffect, useState } from "react";

import { connectorByName } from "utils/web3";
import { Connector } from "utils/web3";

import { connectors } from "configs";

import TrustWallet from "components/svg/icons/TrustWallet";
import Metamask from "components/svg/icons/Metamask";
import CoinBase from "components/svg/icons/CoinBase";

const useProviders = () => {
  const [providers, setProviders] = useState<Connector[]>([]);

  useEffect(() => {
    (async function () {
      let injectedProviderData: Connector | null = connectors[0];
      let restProviders = connectors.slice(1);
      const connector = connectorByName.injectedConnector;

      try {
        const provider = await connector.getProvider();

        if (provider?.isTrustWallet) {
          injectedProviderData = {
            ...injectedProviderData,
            title: "Trust Wallet",
            icon: TrustWallet,
          };
        } else if (
          (provider?.selectedProvider?.isMetaMask && !provider?.selectedProvider?.isDeficonnectProvider) ||
          (provider?.isMetaMask && !provider?.isDeficonnectProvider)
        ) {
          injectedProviderData = {
            ...injectedProviderData,
            title: "Metamask",
            icon: Metamask,
          };
        } else if (provider?.isCoinbaseWallet) {
          injectedProviderData = {
            ...injectedProviderData,
            title: "Coinbase",
            icon: CoinBase,
          };
          const walletConnect = connectors[1];
          restProviders = [walletConnect];
        }
      } catch (error) {
        console.error("getProviderData: ", error);
      }

      const newProviders = [injectedProviderData, ...restProviders];
      setProviders(newProviders);
    })();
  }, []);

  return { providers };
};

export default useProviders;

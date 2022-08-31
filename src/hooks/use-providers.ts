import { useEffect, useState } from "react";

import { connectorByName } from "utils/web3";
import { Connector } from "utils/web3/types";

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

        if (!provider) {
          injectedProviderData = null;
        } else if (provider?.isTrustWallet) {
          // TODO check the translation
          injectedProviderData = {
            ...injectedProviderData,
            title: "Trust Wallet",
            icon: TrustWallet,
          };
        } else if (provider?.selectedProvider?.isMetaMask || provider?.isMetaMask) {
          injectedProviderData = {
            ...injectedProviderData,
            title: "Metamask",
            icon: Metamask,
            // TODO replace with our production url
            href: "https://metamask.app.link/dapp/pancakeswap.finance/",
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
        injectedProviderData = null;

        console.error((error as Error).message);
      }

      const newProviders = [injectedProviderData, ...restProviders];
      const filteredProviders = newProviders.filter(data => data !== null) as Connector[];
      setProviders(filteredProviders);
    })();
  }, []);

  return { providers };
};

export default useProviders;

import { SessionTypes } from "@walletconnect/types";
import { useWeb3React } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect-v2";

import { getConnection, ChainId, ConnectionType, SUPPORTED_CHAINS, CHAIN_IDS_TESTNET } from "configs/web3";

const getChainIdFromFormattedString = (item: string) => {
  const splitItem = item.startsWith("eip155:") ? item.split(":") : [];
  return splitItem.length > 1 && !isNaN(+splitItem[1]) ? +splitItem[1] : null;
};

const getSupportedChainIdsFromWalletConnectSession = (session?: SessionTypes.Struct) => {
  if (!session?.namespaces) return [];

  const eip155Keys = Object.keys(session.namespaces);
  const namespaces = Object.values(session.namespaces);

  // Collect all arrays into one for unified processing
  const allItems = [
    ...eip155Keys,
    ...namespaces.flatMap(namespace => namespace.chains),
    ...namespaces.flatMap(namespace => namespace.accounts),
  ];

  // Process all items to extract chainIds
  const allChainIds = allItems
    .map(item => {
      if (typeof item === "string") {
        return getChainIdFromFormattedString(item);
      }
      // Check if the item is a number
      return isNaN(Number(item)) ? null : Number(item);
    })
    .filter(item => item !== null) as ChainId[]; // Filter out any null values

  return Array.from(new Set(allChainIds));
};

export const useWalletSupportedChains = () => {
  const { connector } = useWeb3React();

  const connectionType = getConnection(connector).type;

  switch (connectionType) {
    case ConnectionType.WALLET_CONNECT_V2:
      return getSupportedChainIdsFromWalletConnectSession((connector as WalletConnect).provider?.session);
    default:
      return SUPPORTED_CHAINS;
  }
};

export const useSupportedChains = () => {
  const walletSupportsChain = useWalletSupportedChains();

  const showTestnets = true;

  const { supported, unsupported } = SUPPORTED_CHAINS.filter(chain => {
    return showTestnets || !CHAIN_IDS_TESTNET.includes(chain);
  }).reduce<Record<string, ChainId[]>>(
    (acc, chain) => {
      if (walletSupportsChain.includes(chain)) {
        acc.supported.push(chain);
      } else {
        acc.unsupported.push(chain);
      }
      return acc;
    },
    { supported: [], unsupported: [] },
  );

  return [supported, unsupported, walletSupportsChain];
};

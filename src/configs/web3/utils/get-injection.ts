import { TrustWalletIcon, LedgerIcon, MetamaskIcon, Web3Icon } from "components/svg";

import { isMobile } from "utils";

/**
 * Checks the window object for the presence of a known injectors and returns the most relevant injector name and icon.
 * Returns a default metamask installation object if no wallet is detected.
 */

const InjectedWallets = {
  isTrust: { name: "Trust Wallet", icon: TrustWalletIcon },
  isLedgerConnect: { name: "Ledger", icon: LedgerIcon },
};

export const getInjection = () => {
  for (const [key, wallet] of Object.entries(InjectedWallets)) {
    if (window.ethereum?.[key as keyof Window["ethereum"]]) return wallet;
  }

  // Check for MetaMask last, as other injectors will also set this flag, i.e. Trust Wallet, Phantom Wallet
  if (window.ethereum?.isMetaMask) return { name: "MetaMask", icon: MetamaskIcon };

  // Prompt metamask installation when there is no injection present or the only injection detected is coinbase (CB has separate entry point in UI)
  if (!window.ethereum || window.ethereum.isCoinbaseWallet) return { name: "Install MetaMask", icon: MetamaskIcon };

  // Use a generic icon when injection is present but no known non-coinbase wallet is detected
  return { name: "Web3 Wallet", icon: Web3Icon };
};

/**
 * Returns true if `isMetaMask` is set to true and another non-metamask injector cannot be detected.
 *
 * Some non-metamask wallets set `isMetaMask` to true for dapp-compatability reasons. If one of these
 * injectors are detected, this function will return false.
 * https://wallet-docs.brave.com/ethereum/wallet-detection#compatability-with-metamask
 */
export const getIsMetaMaskWallet = () => getInjection().name === "MetaMask";

export const getIsCoinbaseWallet = () => window.ethereum?.isCoinbaseWallet;

export const getIsInjected = () => !!window.ethereum;

export const getIsCoinbaseWalletBrowser = () => isMobile && getIsCoinbaseWallet();

export const getIsMetaMaskBrowser = () => isMobile && getIsMetaMaskWallet();

export const getIsInjectedMobileBrowser = () => getIsCoinbaseWalletBrowser() || getIsMetaMaskBrowser();

export const getShouldAdvertiseMetaMask = () =>
  !getIsMetaMaskWallet() && !isMobile && (!getIsInjected() || getIsCoinbaseWallet());

export const getIsGenericInjector = () => getIsInjected() && !getIsMetaMaskWallet() && !getIsCoinbaseWallet();

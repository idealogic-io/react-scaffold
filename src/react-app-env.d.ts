interface Window {
  ethereum?: Ethereum;
}

interface isWallets {
  isMetaMask?: boolean;
  isTrustWallet?: boolean;
  isCoinbaseWallet?: boolean;
  isDeficonnectProvider?: boolean;
  isBraveWallet?: boolean;
  isLedgerConnect?: boolean;
}

interface Ethereum extends isWallets {
  selectedProvider?: isWallets;
  providers?: unknown[];
  request?: (...args: unknown[]) => Promise<void>;
}

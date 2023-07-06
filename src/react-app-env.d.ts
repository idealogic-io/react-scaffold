interface Window {
  ethereum?: {
    isMetaMask?: true;
    isTrust?: true;
    providers?: unknown[];
    request?: (...args: unknown[]) => Promise<void>;
  };
}

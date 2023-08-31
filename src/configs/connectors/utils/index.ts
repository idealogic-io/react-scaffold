export {
  getInjection,
  getIsMetaMaskWallet,
  getIsCoinbaseWallet,
  getIsInjected,
  getIsCoinbaseWalletBrowser,
  getIsMetaMaskBrowser,
  getIsInjectedMobileBrowser,
  getShouldAdvertiseMetaMask,
  getIsGenericInjector,
} from "./get-injection";
export { getReason, isUserReject, isRequestPending } from "./web3-error-helpers";
export { addChainParameters } from "./add-chain-parameters";
export { isSupportedChain } from "./is-supported-chain";
export { getContract, getSigner, getProviderOrSigner } from "./get-contract";
export { isAddress } from "./address-helpers";
export { validateAndParseAddress, checkValidAddress } from "./validate-and-parse-address";
export { maxAmountToSpend } from "./max-amount-to-spend";
export type { UserRejectedRequestError, WalletError } from "./web3-error-helpers";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { blockExplorersUrls } from "configs";

export const getScanLink = (
  data: string | number,
  type: "transaction" | "token" | "address" | "block" | "countdown",
  chainId: number,
) => {
  switch (type) {
    case "transaction": {
      return `${blockExplorersUrls[chainId]}/tx/${data}`;
    }
    case "token": {
      return `${blockExplorersUrls[chainId]}/token/${data}`;
    }
    case "block": {
      return `${blockExplorersUrls[chainId]}/block/${data}`;
    }
    case "countdown": {
      return `${blockExplorersUrls[chainId]}/block/countdown/${data}`;
    }
    default: {
      return `${blockExplorersUrls[chainId]}/address/${data}`;
    }
  }
};

export const getScanLinkSolana = (
  data: string | number,
  type: "transaction" | "token" | "account" | "block",
  network: WalletAdapterNetwork,
) => {
  const blockExplorersUrls = "https://solscan.io";

  const cluster =
    network === WalletAdapterNetwork.Devnet
      ? "?cluster=devnet"
      : network === WalletAdapterNetwork.Testnet
      ? "?cluster=testnet"
      : null;

  switch (type) {
    case "transaction": {
      return `${blockExplorersUrls}/tx/${data}${cluster}`;
    }
    case "token": {
      return `${blockExplorersUrls}/token/${data}${cluster}`;
    }
    case "account": {
      return `${blockExplorersUrls}/account/${data}${cluster}`;
    }
    case "block": {
      return `${blockExplorersUrls}/block/${data}${cluster}`;
    }
  }
};

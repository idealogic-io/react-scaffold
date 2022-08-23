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

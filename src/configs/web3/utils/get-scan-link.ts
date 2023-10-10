import { ChainId } from "configs/web3";
import { BLOCK_EXPLORER_URLS } from "configs/web3/chains";

export const getScanLink = (
  data: string | number,
  type: "transaction" | "token" | "address" | "block" | "countdown",
  chainId: ChainId,
) => {
  switch (type) {
    case "transaction": {
      return `${BLOCK_EXPLORER_URLS[chainId]}/tx/${data}`;
    }
    case "token": {
      return `${BLOCK_EXPLORER_URLS[chainId]}/token/${data}`;
    }
    case "block": {
      return `${BLOCK_EXPLORER_URLS[chainId]}/block/${data}`;
    }
    case "countdown": {
      return `${BLOCK_EXPLORER_URLS[chainId]}/block/countdown/${data}`;
    }
    default: {
      return `${BLOCK_EXPLORER_URLS[chainId]}/address/${data}`;
    }
  }
};

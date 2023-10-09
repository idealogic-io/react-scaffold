import { ChainId } from "configs/web3";

export type ChainOptionProps = {
  disabled?: boolean;
  targetChain: ChainId;
  isPending: boolean;
  onSelectChain: (targetChain: ChainId) => void;
};

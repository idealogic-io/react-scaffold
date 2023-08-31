import { ChainId } from "configs/connectors";

export type ChainOptionProps = {
  disabled?: boolean;
  targetChain: ChainId;
  isPending: boolean;
  onSelectChain: (targetChain: ChainId) => void;
};

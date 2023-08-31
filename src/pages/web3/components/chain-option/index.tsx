import React from "react";
import { useWeb3React } from "@web3-react/core";

import { Button, Text } from "components";

import { CHAINS } from "configs/connectors";
import { ChainOptionProps } from "./types";

export const ChainOption: React.FC<ChainOptionProps> = ({ disabled, targetChain, isPending, onSelectChain }) => {
  const { chainId } = useWeb3React();
  const active = chainId === targetChain;

  const chainInfo = CHAINS[targetChain];
  const label = chainInfo?.chainName;

  const onClick = () => {
    if (!disabled) {
      onSelectChain(targetChain);
    }
  };

  return (
    <Button disabled={disabled} onClick={onClick} isLoading={!active && isPending} my="8px">
      {label && <Text mr="4px">{label} </Text>}
      {disabled && <Text>Unsupported by your wallet</Text>}
      {isPending && <Text>Approve in wallet</Text>}

      {active && <Text>Active</Text>}
    </Button>
  );
};

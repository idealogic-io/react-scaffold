import React, { useState } from "react";

import { Column } from "components";
import { ChainOption } from "../chain-option";

import { ChainId, useActivationState, useSelectChain, useSupportedChains } from "configs/web3";

import { ActivationStatus } from "store/web3-wallet/types";

export const ChainOptions: React.FC = () => {
  const [pendingChainId, setPendingChainId] = useState<ChainId | undefined>();

  const [supportedChains, unsupportedChains, walletSupportsChain] = useSupportedChains();
  const { selectChain } = useSelectChain();
  const { connectionStatus } = useActivationState();

  const isSomeOptionPending = connectionStatus.status === ActivationStatus.PENDING;

  const onSelectChain = async (targetChainId: ChainId) => {
    setPendingChainId(targetChainId);
    await selectChain(targetChainId);
    setPendingChainId(undefined);
  };

  return (
    <Column>
      {supportedChains.map(selectorChain => (
        <ChainOption
          disabled={!walletSupportsChain.includes(selectorChain)}
          onSelectChain={onSelectChain}
          targetChain={selectorChain}
          key={selectorChain}
          isPending={selectorChain === pendingChainId || isSomeOptionPending}
        />
      ))}

      {unsupportedChains.map(selectorChain => (
        <ChainOption
          disabled
          onSelectChain={() => undefined}
          targetChain={selectorChain}
          key={selectorChain}
          isPending={false}
        />
      ))}
    </Column>
  );
};

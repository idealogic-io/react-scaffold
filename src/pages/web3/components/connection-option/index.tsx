import React from "react";

import { Button } from "components";

import { Connection, useActivationState, useQueryChainId } from "configs/web3";

import { ActivationStatus } from "store/web3-wallet/types";

export const ConnectionOption: React.FC<{ connection: Connection }> = ({ connection }) => {
  const { parsedChainId } = useQueryChainId();
  const { activate, connectionStatus } = useActivationState();

  const { getName, getIcon } = connection;
  const Icon = getIcon?.();

  const isSomeOptionPending = connectionStatus.status === ActivationStatus.PENDING;
  const isCurrentOptionPending = isSomeOptionPending && connectionStatus.connection.type === connection.type;

  const onConnect = async () => {
    await activate(connection, parsedChainId);
  };

  return (
    <Button
      startIcon={Icon ? <Icon /> : undefined}
      onClick={onConnect}
      my="4px"
      disabled={isSomeOptionPending}
      isLoading={isCurrentOptionPending}
    >
      {getName()}
    </Button>
  );
};

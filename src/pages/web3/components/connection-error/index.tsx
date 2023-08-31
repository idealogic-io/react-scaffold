import React from "react";

import { Box, Button, Heading, Text, Link } from "components";

import { useActivationState, useQueryChainId } from "configs/connectors";

import { ActivationStatus } from "store/web3-wallet/types";

export const ConnectionError: React.FC = () => {
  const { connectionStatus, activate, cancelActivation } = useActivationState();
  const { parsedChainId } = useQueryChainId();

  if (connectionStatus.status !== ActivationStatus.ERROR) {
    return null;
  }

  const retry = () => {
    activate(connectionStatus.connection, parsedChainId);
  };

  return (
    <Box>
      <Heading as="h2" scale="h2" mb="8px">
        Error connecting
      </Heading>

      <Text textAlign="center" mb="24px" textScale="body1">
        The connection attempt failed. Please click try again and follow the steps to connect in your wallet.
      </Text>

      <Button onClick={retry}>Try Again</Button>

      <Link onClick={cancelActivation}>Back to wallet selection</Link>
    </Box>
  );
};

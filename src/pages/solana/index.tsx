import React, { useEffect, useState } from "react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

import { Button, Column, Heading, Page, Text } from "components";
import { solanaNetwork } from "App";
import { solanaTokens } from "configs/tokens";
import { SingleToken } from "./components";

type TokenList = { address: string; key: string }[];

const SolanaPage: React.FC = () => {
  const [tokensList, setTokensList] = useState<TokenList>([]);

  const { setVisible } = useWalletModal();
  const { publicKey, connected, disconnect } = useWallet();

  const address = publicKey?.toBase58() ?? null;

  useEffect(() => {
    getTokenList();
  }, []);

  const getTokenList = () => {
    const tokensList = Object.entries(solanaTokens)
      .map(([key, value]) => {
        if (value[solanaNetwork]) {
          return { address: value[solanaNetwork], key };
        } else return null;
      })
      .filter(el => el !== null);

    setTokensList(tokensList as TokenList);
  };

  const chooseWallet = () => {
    setVisible(true);
  };

  const logout = async () => {
    await disconnect();
  };

  return (
    <Page>
      <Heading>Solana Page</Heading>
      <Column>
        {connected && (
          <Column py="16px">
            <Text>You currently on:</Text>
            <Text>{solanaNetwork}</Text>
          </Column>
        )}

        {connected && (
          <Column py="16px">
            <Text>You address:</Text>
            <Text>{address}</Text>
          </Column>
        )}

        {tokensList.length && connected
          ? tokensList.map(({ key, address }) => <SingleToken key={key} address={address} />)
          : null}

        {!connected && <Button onClick={chooseWallet}>Connect</Button>}
        {connected && <Button onClick={logout}>Logout</Button>}
      </Column>
    </Page>
  );
};

export default SolanaPage;

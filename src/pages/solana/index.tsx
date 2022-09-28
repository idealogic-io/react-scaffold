import React, { useEffect, useState } from "react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { Button, Column, Heading, Page, Text } from "components";
import { solanaNetwork } from "App";
import { solanaTokens } from "configs/tokens";
import { SingleToken } from "./components";
import { useWeb3BalanceSolana, useWeb3Login } from "hooks";

type TokenList = { address: string; key: string }[];

const SolanaPage: React.FC = () => {
  const [tokensList, setTokensList] = useState<TokenList>([]);

  const { setVisible } = useWalletModal();
  const { publicKey, connected, disconnect } = useWallet();
  const { balance } = useWeb3BalanceSolana();
  const { logout: web3Logout } = useWeb3Login();

  const address = publicKey?.toBase58() ?? null;
  const formattedBalance = balance / LAMPORTS_PER_SOL;

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
    // Disconnect from web3 wallet on login through solana
    web3Logout();

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

        {connected && (
          <Column py="16px">
            <Text>You balance is:</Text>
            <Text>{formattedBalance} SOL</Text>
          </Column>
        )}

        {tokensList.length && connected
          ? tokensList.map(({ key, address }) => <SingleToken key={key} address={address} balance={formattedBalance} />)
          : null}

        {!connected && <Button onClick={chooseWallet}>Connect</Button>}
        {connected && <Button onClick={logout}>Logout</Button>}
      </Column>
    </Page>
  );
};

export default SolanaPage;

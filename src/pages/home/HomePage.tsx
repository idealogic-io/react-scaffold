import React, { useEffect, useState } from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { useSearchParams } from "react-router-dom";

// Components
import { Button, Heading, Text, Page, Column } from "components";
import { SingleToken } from "./components";
// Context
import { useTranslation } from "context";
// Hooks
import { useWeb3Balance, useWeb3Login, useWeb3AutoConnect } from "hooks";
import { useContractData } from "./hooks";
// Configs
import { chainNames, connectors, getChainIds, LOCAL_STORAGE_KEYS } from "configs";
import { RU, EN } from "configs/languages";
import { tokens } from "configs/tokens";
// Utils
import { connectorByName, connectorName, formatBigNumberToFixed, setupNetwork } from "utils/web3";
// Types
import { Connector } from "utils/web3/types";

type TokenList = { address: string; key: string }[];

const HomePage: React.FC = () => {
  const [tokensList, setTokensList] = useState<TokenList>([]);

  const { t, currentLanguage, changeLanguage } = useTranslation();
  const { chainId, account, active, error } = useWeb3React();
  const { balance } = useWeb3Balance();
  const { login, logout } = useWeb3Login();
  const [searchParams, setSearchParams] = useSearchParams();
  const networkId = searchParams.get("networkId");

  const isUnsupportedChainId = error instanceof UnsupportedChainIdError;
  const supportedChains = getChainIds();

  const {
    data: { isApproved, lastCourse, loading },
    pendingTx,
    onApprove,
    onPurchaseCourse,
    getLastCourseHandler,
  } = useContractData();

  useWeb3AutoConnect(+(networkId as string));

  useEffect(() => {
    if (chainId) {
      const tokensList = Object.entries(tokens)
        .map(([key, value]) => {
          if (value[chainId]) {
            return { address: value[chainId], key };
          } else return null;
        })
        .filter(el => el !== null);

      setTokensList(tokensList as TokenList);
    }
  }, [chainId]);

  const onConnect = (walletConfig: Connector) => {
    const { title, href, connectorId } = walletConfig;
    // Open url in metamask app
    if (!window.ethereum && title === "Metamask" && href) {
      window.open(href, "_blank", "noopener noreferrer");
    } else {
      login(connectorId as keyof typeof connectorName);
    }
  };

  const changeChainHandler = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value: chainId },
    } = event;
    const connectorId = localStorage.getItem(LOCAL_STORAGE_KEYS.connector);
    const connector = connectorByName[connectorId as keyof typeof connectorByName];

    if (connector) {
      setSearchParams({ networkId: chainId });
      try {
        const provider = await connector.getProvider();
        await setupNetwork(provider, +chainId);
      } catch (error) {
        console.error((error as Error).message);
      }
    }
  };

  const changeLanguageHandler = () => {
    const newLanguage = currentLanguage.code === "en" ? RU : EN;

    changeLanguage(newLanguage);
  };

  return (
    <Page>
      <Heading>{t("Main Page")}</Heading>
      <Column>
        {active && (
          <Column py="16px">
            <Text>You currently on:</Text>
            <Text>{chainNames[chainId as keyof typeof chainNames]}</Text>
          </Column>
        )}

        {active && (
          <Column py="16px">
            <Text>You address:</Text>
            <Text>{account}</Text>
          </Column>
        )}

        {active && (
          <Column py="16px">
            <Text>You balance is:</Text>
            <Text>{formatBigNumberToFixed(balance, 8)}</Text>
          </Column>
        )}

        {!active && !isUnsupportedChainId && (
          <Column>
            {connectors.map(walletConfig => {
              const { title, icon: Icon } = walletConfig;

              return (
                <Button scale="md" key={title} startIcon={<Icon />} onClick={() => onConnect(walletConfig)} my="4px">
                  {t("Connect %provider%", { provider: title })}
                </Button>
              );
            })}
          </Column>
        )}

        {active || isUnsupportedChainId ? (
          <select name="chain" value={networkId ?? ""} defaultValue={""} onChange={changeChainHandler}>
            <option disabled value={""}>
              -- select a chain --
            </option>
            {supportedChains.map(val => (
              <option key={val} value={val}>
                {chainNames[val]}
              </option>
            ))}
          </select>
        ) : null}

        {active && <Text>Interactions with contract can be only on Polygon Mumbai</Text>}

        {active && (
          <Button isLoading={pendingTx || loading} onClick={!isApproved ? onApprove : onPurchaseCourse}>
            {!isApproved ? "Approve" : "Purchase Course"}
          </Button>
        )}

        {active && <Button onClick={getLastCourseHandler}>Get last course</Button>}

        {active && lastCourse && JSON.stringify(lastCourse)}

        {tokensList.length && tokensList.map(({ key, address }) => <SingleToken key={key} address={address} />)}

        <Button scale="md" onClick={logout} my="4px">
          {t("Logout")}
        </Button>
        <Button onClick={changeLanguageHandler}>{t("Change Language")}</Button>
      </Column>
    </Page>
  );
};

export default HomePage;

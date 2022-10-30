import React from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { useNavigate, useSearchParams } from "react-router-dom";
import { JSBI, TokenAmount } from "@pancakeswap/sdk";
import { formatUnits } from "@ethersproject/units";
// Components
import { Button, Heading, Text, Page, Column } from "components";
import { SingleToken } from "./components";
// Context
import { useTranslation } from "context";
// Hooks
import { useWeb3Login, useProviders, useWeb3AutoConnect, useNativeBalance } from "hooks";
// Configs
import { chainNames, getChainIds, LOCAL_STORAGE_KEYS, nativeCurrencies, NATIVE_ADDRESS, tokensList } from "configs";
import { ROUTES } from "navigation/routes";
// Utils
import { connectorByName, connectorName, setupNetwork, Connector } from "utils/web3";
import { useTokenBalances } from "hooks/use-token-balance";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { chainId, account, active, error } = useWeb3React();
  const { balance } = useNativeBalance();
  const { providers } = useProviders();

  const { login, logout } = useWeb3Login();
  const [searchParams, setSearchParams] = useSearchParams();

  const networkId = searchParams.get("networkId");
  const _networkId = networkId ? +networkId : undefined;
  const isUnsupportedChainId = error instanceof UnsupportedChainIdError;
  const supportedChains = getChainIds();

  useWeb3AutoConnect(_networkId);

  const [balances, _] = useTokenBalances(account ?? undefined, chainId ? Object.values(tokensList[chainId]) : []);

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

  const onSwapClickHandler = () => {
    navigate(ROUTES.swap);
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
            <Text>
              {formatUnits(balance)} {nativeCurrencies[chainId as keyof typeof chainNames]?.symbol}
            </Text>
          </Column>
        )}

        {!active && (
          <Column>
            {providers.length ? (
              providers.map(walletConfig => {
                const { title, icon: Icon } = walletConfig;

                return (
                  <Button scale="md" key={title} startIcon={<Icon />} onClick={() => onConnect(walletConfig)} my="4px">
                    {t("Connect %provider%", { provider: title })}
                  </Button>
                );
              })
            ) : (
              <Text>Loading...</Text>
            )}
          </Column>
        )}

        {active || isUnsupportedChainId ? (
          <select name="chain" value={chainId} defaultValue={""} onChange={changeChainHandler}>
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

        {chainId
          ? Object.entries(tokensList[chainId]).map(([key, token]) => {
              // TODO not perfect solution need to refactor
              const _balance =
                token.address.toLowerCase() === NATIVE_ADDRESS
                  ? new TokenAmount(token, JSBI.BigInt(balance.toString()))
                  : balances[token.address];

              return <SingleToken key={key} tokenAmount={_balance} nativeBalance={balance} />;
            })
          : null}

        <Button scale="md" onClick={onSwapClickHandler} my="4px">
          {t("Swap")}
        </Button>

        <Button scale="md" onClick={logout} my="4px">
          {t("Logout")}
        </Button>
      </Column>
    </Page>
  );
};

export default HomePage;

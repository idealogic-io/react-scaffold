import React from "react";
// Components
import { Button, Text, Page, Column } from "components";
import { SingleToken } from "./components";
// Context
import { useTranslation } from "context";
// Hooks
import { useWeb3AutoConnect } from "hooks";
import { useHandleData } from "./hooks";
// Configs
import { chainNames, tokensList } from "configs";
// Utils
import { parseChainIdFromString } from "utils/web3";
const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const {
    chainIdFromSearchParams,
    chainId,
    account,
    active,
    nativeBalance,
    nativeCurrency,
    providers,
    supportedChains,
    isUnsupportedChainId,
    isDifferentNetwork,
    logout,
    onConnect,
    changeChainHandler,
  } = useHandleData();

  useWeb3AutoConnect(chainIdFromSearchParams);

  return (
    <Page>
      <Column>
        {isUnsupportedChainId ? (
          <Text textScale="body2" color="error400">
            Network in a wallet is not supported
          </Text>
        ) : null}
        {isDifferentNetwork ? (
          <Text textScale="body2" color="error400">
            The network selected in your external wallet does not match the network selected on the platform
          </Text>
        ) : null}

        {chainId && (
          <Column py="16px">
            <Text textScale="body2">You currently on:</Text>
            <Text textScale="body2" $fontWeight="bold">
              {chainNames[chainId] || "Unknown chain"}
            </Text>
          </Column>
        )}

        {account && (
          <Column py="16px">
            <Text textScale="body2">You address:</Text>
            <Text textScale="body2" $fontWeight="bold">
              {account}
            </Text>
          </Column>
        )}

        {active && (
          <Column py="16px">
            <Text textScale="body2">You native balance is:</Text>
            <Text textScale="body2" $fontWeight="bold">
              {nativeBalance.toFormat(8)} {nativeCurrency?.symbol}
            </Text>
          </Column>
        )}

        {active ? null : (
          <Column>
            {providers.map(walletConfig => {
              const { title, icon: Icon } = walletConfig;

              return (
                <Button key={title} startIcon={<Icon />} onClick={() => onConnect(walletConfig)} my="4px">
                  {t("Connect %provider%", { provider: title })}
                </Button>
              );
            })}
          </Column>
        )}

        {active ? (
          <select
            name="chain"
            value={chainIdFromSearchParams || ""}
            onChange={e => changeChainHandler(parseChainIdFromString(e.target.value))}
          >
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
          ? Object.values(tokensList[chainId] ?? {}).map(token => {
              return <SingleToken key={token.address} token={token} nativeBalance={nativeBalance} />;
            })
          : null}

        <Button onClick={logout} my="4px">
          {t("Logout")}
        </Button>
      </Column>
    </Page>
  );
};

export default HomePage;

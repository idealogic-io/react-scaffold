import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Network } from "@web3-react/network";
// Components
import { Button, Text, Page, Column } from "components";
import { ChainOptions, ConnectionError, ConnectionOption, Currency } from "./components";
// Context
import { useTranslation } from "context";
// Utils
import {
  CHAINS,
  getConnection,
  getConnections,
  isSupportedChain,
  useActivationState,
  useEagerConnect,
  useQueryChainId,
  useSyncChains,
  useSyncNetworkConnection,
  useNativeCurrencyBalances,
  useCurrencyListByChainId,
  useCurrencyBalances,
} from "configs/connectors";

import { ActivationStatus } from "store/web3-wallet/types";

const Web3Page: React.FC = () => {
  const { t } = useTranslation();
  const connections = getConnections();
  const { chainId, account, connector, isActive } = useWeb3React();
  const { deactivate, connectionStatus } = useActivationState();
  const { parsedChainId } = useQueryChainId();
  const connection = getConnection(connector);
  const { list: currencyList, isLoading: currencyListLoading } = useCurrencyListByChainId(chainId);
  const currencyAmount = useCurrencyBalances(account, currencyList);

  const isUnsupportedNetwork = chainId && !isSupportedChain(chainId);
  // We almost always connected to network connection
  const isDifferentNetwork = chainId && !(connector instanceof Network) && chainId !== parsedChainId;

  useEagerConnect();
  useSyncNetworkConnection();
  useSyncChains();

  const nativeAmount = useNativeCurrencyBalances([account])?.[account ?? ""];
  const nativeCurrency = nativeAmount?.currency;
  const nativeBalance = nativeAmount?.amount?.toFormatExtended(8) ?? "0";

  return (
    <Page>
      <Column>
        {isUnsupportedNetwork && (
          <Text textScale="body2" color="error400">
            Your wallet&apos;s current network is unsupported.
          </Text>
        )}

        {isDifferentNetwork && (
          <Text textScale="body2" color="error400">
            The network selected in your external wallet does not match the network selected on the platform
          </Text>
        )}

        {isActive && connection && <Text textScale="body2">Your connection is: {connection.getName()}</Text>}

        {chainId && (
          <Column py="16px">
            <Text textScale="body2">You currently on:</Text>
            <Text textScale="body2" $fontWeight="bold">
              {chainId in CHAINS ? CHAINS[chainId]?.chainName : "Unknown chain"}
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

        {account && (
          <Column py="16px">
            <Text textScale="body2">You native balance:</Text>
            <Text textScale="body2" $fontWeight="bold">
              {nativeBalance} {nativeCurrency?.symbol}
            </Text>
          </Column>
        )}

        {account ? null : connectionStatus.status === ActivationStatus.ERROR ? (
          <ConnectionError />
        ) : (
          <Column>
            {connections
              .filter(connection => connection.shouldDisplay())
              .map(connection => (
                <ConnectionOption key={connection.getName()} connection={connection} />
              ))}
          </Column>
        )}

        <ChainOptions />

        {currencyListLoading ? (
          <Text>Loading</Text>
        ) : currencyList.length && !isUnsupportedNetwork && !!account ? (
          currencyList.map((currency, index) => {
            return (
              <Currency
                key={currency.name + "_" + index}
                currency={currency}
                currencyAmount={currencyAmount[index]}
                account={account}
              />
            );
          })
        ) : null}

        <Button onClick={deactivate} my="4px">
          {t("Logout")}
        </Button>
      </Column>
    </Page>
  );
};

export default Web3Page;

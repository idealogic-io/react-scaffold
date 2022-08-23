import React, { useEffect, useState } from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { parseUnits } from "@ethersproject/units";
import random from "lodash/random";
// Components
import { Button, Heading, Text, Page, Column, ToastDescriptionWithTx } from "components";
// Context
import { useTranslation } from "context";
// Hooks
import { useWaitTransaction, useWeb3Balance, useWeb3Login } from "hooks";
// Configs
import { chainNames, connectors, getChainIds, LOCAL_STORAGE_KEYS } from "configs";
// Utils
import {
  connectorByName,
  connectorName,
  formatBigNumber,
  formatBigNumberToFixed,
  getCourseMarketplaceContract,
  setupNetwork,
} from "utils/web3";

// Types
import { Connector } from "utils/web3/types";
import { Course, NormalizedCourse } from "./types";

import { RU, EN } from "configs/languages";
import { toast } from "react-toastify";
import { tokens } from "configs/tokens";
import { SingleToken } from "./components";

type TokenList = { address: string; key: string }[];

const HomePage: React.FC = () => {
  const [lastCourse, setLastCourse] = useState<NormalizedCourse | null>(null);
  const [tokensList, setTokensList] = useState<TokenList>([]);

  const { t, currentLanguage, changeLanguage } = useTranslation();
  const { chainId, account, active, error, library } = useWeb3React();
  const { balance } = useWeb3Balance();
  const { login, logout } = useWeb3Login();
  const { fetchWithCatchTxError, loading: pendingTx } = useWaitTransaction();

  const isUnsupportedChainId = error instanceof UnsupportedChainIdError;
  const supportedChains = getChainIds();

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

  const onPurchaseCourse = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return purchaseCourseHandler();
    });
    if (receipt?.status) {
      toast.success(
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>{t("You purchased a course")}</ToastDescriptionWithTx>,
      );
      getLastCourseHandler();
    }
  };

  const purchaseCourseHandler = async () => {
    const courseContract = getCourseMarketplaceContract(library?.getSigner(), chainId);
    let courseId = "";
    for (let i = 0; i < 4; i++) {
      courseId += random(0, 9);
    }

    const value = parseUnits(".01", "ether");
    return courseContract.purchaseCourse(+courseId, { value });
  };

  const getLastCourseHandler = async () => {
    try {
      const courseContract = getCourseMarketplaceContract(library?.getSigner(), chainId);

      const coursesLength = await courseContract.getCourseCount();
      const lastCourseHash = await courseContract.getCourseHashAtIndex(coursesLength - 1);
      const lastCourse: Course = await courseContract.getCourseByHash(lastCourseHash);
      const course: NormalizedCourse = {
        id: formatBigNumber(lastCourse.id, 0, 0),
        price: formatBigNumber(lastCourse.price),
        proof: lastCourse.proof,
        owner: lastCourse.owner,
        state: lastCourse.state,
      };
      setLastCourse(course);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const changeChainHandler = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value: chainId },
    } = event;
    const connectorId = localStorage.getItem(LOCAL_STORAGE_KEYS.connector);
    const connector = connectorByName[connectorId as keyof typeof connectorByName];

    if (connector) {
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

        {active && <Text>Interactions with contract can be only on Polygon Mumbai</Text>}

        {active && (
          <Button isLoading={pendingTx} onClick={onPurchaseCourse}>
            Purchase Course
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

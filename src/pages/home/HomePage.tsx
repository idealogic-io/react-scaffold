import React, { useCallback, useState } from "react";
import { UnsupportedChainIdError } from "@web3-react/core";
import { parseUnits } from "@ethersproject/units";
import random from "lodash/random";
// Components
import { Button, Heading, Text, Page, Column } from "components";
// Context
import { useTranslation } from "context";
// Hooks
import { useActiveWeb3, useWeb3Balance, useWeb3Login } from "hooks";
// Configs
import { connectors } from "configs";
// Utils
import {
  ChainId,
  CHAIN_ID_TO_NAME,
  formatBigNumber,
  formatBigNumberToFixed,
  getCourseMarketplaceContract,
} from "utils/web3";
// Types
import { Connector } from "utils/web3/types";
import { Course, NormalizedCourse } from "./types";

import { RU, EN } from "configs/languages";

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastCourse, setLastCourse] = useState<NormalizedCourse | null>(null);

  const { t, currentLanguage, changeLanguage } = useTranslation();
  const { chainId, account, active, error, library } = useActiveWeb3();
  const { balance } = useWeb3Balance();
  const { login, logout } = useWeb3Login();

  const isActivated = active && chainId;
  const currentChainName = chainId && chainId in CHAIN_ID_TO_NAME ? CHAIN_ID_TO_NAME[chainId as ChainId] : null;

  const onConnect = (walletConfig: Connector) => {
    const { title, href, connectorId } = walletConfig;

    if (!window.ethereum && title === "Metamask" && href) {
      window.open(href, "_blank", "noopener noreferrer");
    } else {
      login(connectorId);
    }
  };

  const purchaseCourseHandler = useCallback(async () => {
    const courseContract = getCourseMarketplaceContract(library?.getSigner());
    let courseId = "";
    for (let i = 0; i < 4; i++) {
      courseId += random(0, 9);
    }

    const value = parseUnits(".1", "ether");

    try {
      setIsLoading(true);
      const tx = await courseContract.purchaseCourse(+courseId, { value });
      // By tx hash we can redirect user to etherscan to watch his transaction
      console.log(tx, "Transaction");
      const result = await tx.wait();
      // Then me can see the result of tx execution
      console.log(result, "Finished Transaction");
    } catch (error) {
      console.error((error as Error).message, "Sorry can't purchase the course");
    } finally {
      setIsLoading(false);
    }
  }, [library, account]);

  const getLastCourseHandler = async () => {
    const courseContract = getCourseMarketplaceContract(library?.getSigner());

    try {
      const coursesLenth = await courseContract.getCourseCount();
      const lastCourseHash = await courseContract.getCourseHashAtIndex(coursesLenth - 1);
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
      console.error((error as Error).message, "Sorry can't get the last course");
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
        {isActivated && (
          <Column py="16px">
            <Text>You currently on:</Text>
            <Text>{currentChainName}</Text>
          </Column>
        )}

        {isActivated && (
          <Column py="16px">
            <Text>You address:</Text>
            <Text>{account}</Text>
          </Column>
        )}

        {isActivated && (
          <Column py="16px">
            <Text>You balance is:</Text>
            <Text>{formatBigNumberToFixed(balance, 8)}</Text>
          </Column>
        )}

        {!active && (
          <Column>
            {connectors.map(walletConfig => {
              const { title, icon: Icon } = walletConfig;
              const text =
                error instanceof UnsupportedChainIdError || (isActivated && currentChainName !== null)
                  ? "Change chain"
                  : t("Connect %provider%", { provider: title });
              return (
                <Button scale="md" key={title} startIcon={<Icon />} onClick={() => onConnect(walletConfig)} my="4px">
                  {text}
                </Button>
              );
            })}
          </Column>
        )}

        {isActivated && <Button onClick={purchaseCourseHandler}>{isLoading ? "Loading" : "Purchase Course"}</Button>}

        {isActivated && <Button onClick={getLastCourseHandler}>Get last course</Button>}

        {isActivated && lastCourse && JSON.stringify(lastCourse)}

        <Button scale="md" onClick={logout} my="4px">
          {t("Logout")}
        </Button>
        <Button onClick={changeLanguageHandler}>{t("Change Language")}</Button>
      </Column>
    </Page>
  );
};

export default HomePage;

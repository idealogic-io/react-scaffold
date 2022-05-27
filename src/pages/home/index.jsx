import React, { useState } from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { parseUnits } from "@ethersproject/units";
import random from "lodash/random";

// Components
import { Button, Column, Page, Text } from "components";
// Context
import { useTranslation } from "context";
// Hooks
import { useWeb3Balance, useWeb3Login } from "hooks";
// Configs
import { connectors, LOCAL_STORAGE_KEYS } from "configs";
// Utils
import { CHAIN_ID_TO_NAME, formatBigNumber, formatBigNumberToFixed, getCourseMarketplaceContract } from "utils/web3";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastCourse, setLastCourse] = useState(null);

  const { t } = useTranslation();
  const { chainId, account, active, error, library } = useWeb3React();
  const { balance } = useWeb3Balance();
  const { login, logout } = useWeb3Login();
  const isActivated = active && chainId;

  const onConnect = walletConfig => {
    const { title, href, connectorId } = walletConfig;

    if (!window.ethereum && title === "Metamask" && href) {
      window.open(href, "_blank", "noopener noreferrer");
    } else {
      login(connectorId);
      localStorage?.setItem(LOCAL_STORAGE_KEYS.connector, connectorId);
    }
  };

  const purchaseCourseHandler = async () => {
    const courseContract = getCourseMarketplaceContract(library.getSigner(account));
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
      console.error(error.message, "Sorry can't purchase the course");
    } finally {
      setIsLoading(false);
    }
  };

  const getLastCourseHandler = async () => {
    const courseContract = getCourseMarketplaceContract(library.getSigner(account));

    try {
      const coursesLenth = await courseContract.getCourseCount();
      const lastCourseHash = await courseContract.getCourseHashAtIndex(coursesLenth - 1);
      const lastCourse = await courseContract.getCourseByHash(lastCourseHash);
      const course = {
        id: formatBigNumber(lastCourse.id, 0, 0),
        price: formatBigNumber(lastCourse.price),
        proof: lastCourse.proof,
        owner: lastCourse.owner,
        state: lastCourse.state,
      };
      setLastCourse(course);
    } catch (error) {
      console.error(error.message, "Sorry can't get the last course");
    }
  };

  return (
    <Page>
      <Text fontSize="32px" as="h1" fontStyle="bold">
        {t("Main page")}
      </Text>
      <Column>
        {isActivated && (
          <Column py="16px">
            <Text>You currently on:</Text>
            <Text>{CHAIN_ID_TO_NAME[chainId]}</Text>
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
                error instanceof UnsupportedChainIdError || (isActivated && !CHAIN_ID_TO_NAME[chainId])
                  ? "Change chain"
                  : t("Connect %provider%", { provider: title });
              return (
                <Button scale="xl" key={title} startIcon={<Icon />} onClick={() => onConnect(walletConfig)} my="4px">
                  {text}
                </Button>
              );
            })}
          </Column>
        )}

        {isActivated && <Button onClick={purchaseCourseHandler}>{isLoading ? "Loading" : "Purchase Course"}</Button>}

        {isActivated && <Button onClick={getLastCourseHandler}>Get last course</Button>}

        {isActivated && lastCourse && JSON.stringify(lastCourse)}

        <Button scale="xl" onClick={logout} my="4px">
          Logout
        </Button>
      </Column>
    </Page>
  );
};

export default HomePage;

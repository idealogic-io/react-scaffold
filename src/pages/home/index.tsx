import React from "react";
// Components
import { Button, Column, Heading, Page } from "components";
// Context
import { useTranslation } from "context";
// Store
import { resetStore } from "services/axios";

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const logoutHandler = () => {
    resetStore();
  };

  return (
    <Page>
      <Heading as="h2" scale="h2">
        {t("Main Page")}
      </Heading>
      <Column>
        <Button my="12px" onClick={logoutHandler}>
          {t("Logout")}
        </Button>
      </Column>
    </Page>
  );
};

export default HomePage;

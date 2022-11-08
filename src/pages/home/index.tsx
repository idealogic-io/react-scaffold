import React from "react";
// Components
import { Button, Heading, Link, Page, Row } from "components";
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
      <Heading>{t("Main Page")}</Heading>
      <Row py="12px">
        <Button onClick={logoutHandler}>{t("Logout")}</Button>
      </Row>

      <Row py="12px">
        <Link href="/">{t("Link to Home page")}</Link>
      </Row>
    </Page>
  );
};

export default HomePage;

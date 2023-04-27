import React from "react";
import { useNavigate } from "react-router-dom";

import { Button, Heading, Page } from "components";

import { useTranslation } from "context";
import { ROUTES } from "navigation/routes";

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/" + ROUTES.login);
  };

  return (
    <Page>
      <Heading scale="h2" as="h2">
        {t("Landing Page")}
      </Heading>

      <Button onClick={onClickHandler}>{t("Login")}</Button>
    </Page>
  );
};

export default LandingPage;

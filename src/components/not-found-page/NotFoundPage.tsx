import React from "react";
import { useNavigate } from "react-router-dom";

import { StyledNotFoundPage } from "./StyledNotFoundPage";

import { Heading, Button } from "components";

import { ROUTES } from "navigation/routes";
import { useTranslation } from "context";

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/${ROUTES.home}`);
  };

  return (
    <StyledNotFoundPage>
      <Heading as="h1" mb="15px">
        {t("Not found Page")} 404
      </Heading>
      <Button mt="8px" scale="lg" onClick={onClickHandler}>
        {t("Go to home page")}
      </Button>
    </StyledNotFoundPage>
  );
};

export default NotFoundPage;

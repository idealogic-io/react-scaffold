import React from "react";
import { useNavigate } from "react-router-dom";

import { StyledNotFoundPage } from "./StyledNotFoundPage";
import { Heading, Button } from "components";

import { ROUTES } from "navigation/routes";
import { useTranslation } from "context";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onClickHandler = () => {
    navigate(`/${ROUTES.home}`);
  };

  return (
    <StyledNotFoundPage>
      <Heading mb="15px">{t("Not found Page")} 404</Heading>
      <Button mt="8px" scale="lg" onClick={onClickHandler}>
        Go to home page
      </Button>
    </StyledNotFoundPage>
  );
};

export default NotFoundPage;

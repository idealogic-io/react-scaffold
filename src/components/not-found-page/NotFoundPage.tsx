import React from "react";

import { StyledNotFoundPage } from "./StyledNotFoundPage";

import { ROUTES } from "navigation/routes";
import { useTranslation } from "context";
import { Link, Text } from "components";

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <StyledNotFoundPage>
      <Text fontSize="32px" $fontWeight="bold" mb="15px">
        {t("Not found Page")} 404
      </Text>
      <Link href={ROUTES.landing}>{t("Go to landing page")}</Link>
    </StyledNotFoundPage>
  );
};

export default NotFoundPage;

import React from "react";
import { Link } from "react-router-dom";
// Components
import { Button, Page, Text } from "components";
// Context
import { useTranslation } from "context";

const LandingPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <Text fontSize="32px" as="h1" fontStyle="bold">
        {t("Landing Page")}
      </Text>

      <Button as={Link} to="/login">
        {t("Login")}
      </Button>
    </Page>
  );
};

export default LandingPage;

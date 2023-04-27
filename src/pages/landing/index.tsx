import React from "react";
import { Link } from "react-router-dom";
// Components
import { Button, Heading, Page } from "components";
// Context
import { useTranslation } from "context";

const LandingPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <Heading as="h2" scale="h2">
        {t("Landing Page")}
      </Heading>

      <Button as={Link} to="/login">
        {t("Login")}
      </Button>
    </Page>
  );
};

export default LandingPage;

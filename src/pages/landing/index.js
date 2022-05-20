import React from "react";
// Components
import { Button, Page, Text } from "components";
// Theme
import { fontsStyles } from "theme/base";
import { Link, useLocation } from "react-router-dom";

const LandingPage = () => {
  const location = useLocation();
  console.log(location);

  return (
    <Page>
      <Text fSize="title1" as="h1" fStyle={fontsStyles.mv.bold}>
        Landing page
      </Text>

      <Button as={Link} to="/login">
        Login
      </Button>
    </Page>
  );
};

export default LandingPage;

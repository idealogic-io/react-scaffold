import React from "react";

import { Page, FlexGap, Text } from "components";
import { IdealogicIcon } from "components/svg";

import { ROUTES } from "navigation/routes";

const LandingPage: React.FC = () => {
  return (
    <Page id={ROUTES.home}>
      <FlexGap gap="24px" marginTop="50px">
        <IdealogicIcon width="500px" />
        <Text></Text>
      </FlexGap>
    </Page>
  );
};

export default LandingPage;

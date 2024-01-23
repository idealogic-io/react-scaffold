import React from "react";

import { Page, FlexGap, ProjectDescription } from "components";
import { IdealogicIcon } from "components/svg";

import { ROUTES } from "navigation/routes";

const LandingPage: React.FC = () => {
  return (
    <Page id={ROUTES.home}>
      <FlexGap flexDirection="column" gap="24px" marginTop="50px">
        <IdealogicIcon width="500px" />
        <ProjectDescription />
      </FlexGap>
    </Page>
  );
};

export default LandingPage;

import React from "react";

import { Page, FlexGap, ContractReadExample } from "components";

import { ROUTES } from "navigation/routes";

const ContractInteractionPage: React.FC = () => {
  return (
    <Page id={ROUTES.contractInteraction}>
      <FlexGap flexDirection="column" gap="24px" marginTop="50px">
        <ContractReadExample />
      </FlexGap>
    </Page>
  );
};

export default ContractInteractionPage;

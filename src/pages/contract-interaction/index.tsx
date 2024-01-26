import React from "react";

import { Page, FlexGap, ContractReadExample, ContractWriteExample } from "components";

import { ROUTES } from "navigation/routes";

const ContractInteractionPage: React.FC = () => {
  return (
    <Page id={ROUTES.contractInteraction}>
      <FlexGap flexDirection="column" gap="24px">
        <ContractReadExample />
        <ContractWriteExample />
      </FlexGap>
    </Page>
  );
};

export default ContractInteractionPage;

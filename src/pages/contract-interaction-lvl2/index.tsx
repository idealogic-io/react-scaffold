import React from "react";

import { Page, FlexGap, ContractExampleLvl2 } from "components";

import { ROUTES } from "navigation/routes";

const ContractInteractionLvl2Page: React.FC = () => {
  return (
    <Page id={ROUTES.contractInteractionLvl2}>
      <FlexGap flexDirection="column" gap="24px">
        <ContractExampleLvl2 />
      </FlexGap>
    </Page>
  );
};

export default ContractInteractionLvl2Page;

import React from "react";

import { Page, FlexGap, ContractReadExampleLvl2 } from "components";

import { ROUTES } from "navigation/routes";

const ContractInteractionLvl2Page: React.FC = () => {
  return (
    <Page id={ROUTES.contractInteractionLvl2}>
      <FlexGap flexDirection="column" gap="24px">
        <ContractReadExampleLvl2 />
      </FlexGap>
    </Page>
  );
};

export default ContractInteractionLvl2Page;

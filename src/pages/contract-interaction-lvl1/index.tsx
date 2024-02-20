import React from "react";

import { Page, ContractExampleLvl1 } from "components";

import { ROUTES } from "navigation/routes";

const ContractInteractionLvl1Page: React.FC = () => {
  return (
    <Page id={ROUTES.contractInteractionLvl1}>
      <ContractExampleLvl1 />
    </Page>
  );
};

export default ContractInteractionLvl1Page;

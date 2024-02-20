import React from "react";
import { Route, Routes } from "react-router-dom";

import { DefaultOutlet, NotFoundPage } from "components";
import { RequireAuth } from "./components";
import { ROUTES } from "./routes";

import { LandingPage, ContractInteractionLvl1Page } from "pages";

const Navigation: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<DefaultOutlet />}>
        <Route path={ROUTES.home} element={<LandingPage />} />
        <Route
          path={ROUTES.contractInteractionLvl1}
          element={
            <RequireAuth>
              <ContractInteractionLvl1Page />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Navigation;

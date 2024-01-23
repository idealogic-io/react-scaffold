import React from "react";
import { Route, Routes } from "react-router-dom";

import { DefaultOutlet } from "components";
import { ROUTES } from "./routes";

import { LandingPage } from "pages";

import { NotFoundPage } from "components";

const Navigation: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<DefaultOutlet />}>
        <Route path={ROUTES.home} element={<LandingPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Navigation;

import React from "react";
import { Route, Routes } from "react-router-dom";

import { RequireAuth, TokenHandler } from "./components";
import { ROUTES } from "./routes";

import { NotFoundPage } from "components";
import { HomePage, LandingPage, LoginPage } from "pages";

const Navigation: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.landing} element={<LandingPage />} />
      <Route
        path={ROUTES.login}
        element={
          <TokenHandler>
            <LoginPage />
          </TokenHandler>
        }
      />
      {/* This is test nested navigator */}
      {/* TODO create custom nested navigator */}
      <Route path={ROUTES.home}>
        <Route
          path=""
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route path="app" element={<>App</>} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Navigation;

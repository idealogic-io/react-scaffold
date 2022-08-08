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
        {/* Nesting */}
        <Route path="wallet">
          <Route index element={<>Wallet</>} />

          <Route path=":network">
            <Route index element={<>Network</>} />

            <Route path=":token">
              <Route index element={<>Token</>} />

              <Route path="deposit" element={<>Deposit</>} />
            </Route>
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Navigation;

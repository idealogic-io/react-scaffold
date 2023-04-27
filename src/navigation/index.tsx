import React from "react";
import { Route, Routes } from "react-router-dom";

import { RequireAuth, TokenHandler } from "./components";
import { ROUTES, ROUTE_PARAMS } from "./routes";

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
          index
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />

        <Route path={ROUTES.app} element={<>App</>} />
        {/* Example of Nesting */}
        <Route path={ROUTES.wallet}>
          <Route index element={<>Wallet</>} />

          <Route path={`:${ROUTE_PARAMS.network}`}>
            <Route index element={<>Network</>} />

            <Route path={`:${ROUTE_PARAMS.token}`}>
              <Route index element={<>Token</>} />

              <Route path={ROUTES.deposit} element={<>Deposit</>} />
            </Route>
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Navigation;

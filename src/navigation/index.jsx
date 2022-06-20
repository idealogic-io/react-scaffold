import React from "react";
import { Route, Routes } from "react-router-dom";
import { RequireAuth, TokenHandler } from "./components";
import { ROUTES } from "./routes";

const NotFoundPage = React.lazy(() => import("components/not-found-page"));
const HomePage = React.lazy(() => import("pages/home"));
const LoginPage = React.lazy(() => import("pages/login"));
const LandingPage = React.lazy(() => import("pages/landing"));

const Navigation = () => {
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
      <Route
        path={ROUTES.home}
        element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Navigation;

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./components";

const NotFoundPage = React.lazy(() => import("components/not-found-page"));
const HomePage = React.lazy(() => import("pages/home"));
const LoginPage = React.lazy(() => import("pages/login"));
const LandingPage = React.lazy(() => import("pages/landing"));

const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route
          path={"/home"}
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default Navigation;

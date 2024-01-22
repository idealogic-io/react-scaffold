import React from "react";
import { Route, Routes } from "react-router-dom";

// import { RequireAuth, TokenHandler } from "./components";
// import { ROUTES, ROUTE_PARAMS } from "./routes";

import { NotFoundPage } from "components";

const Navigation: React.FC = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Navigation;

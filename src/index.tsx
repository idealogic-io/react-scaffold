import React from "react";

import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import reportWebVitals from "report-web-vitals";
import { router } from "router";

import "./configs/big-number";

import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

reportWebVitals();

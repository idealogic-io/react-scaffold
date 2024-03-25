import React from "react";
import ReactDOM from "react-dom/client";

import reportWebVitals from "./report-web-vitals";

import App from "./App";

import "./configs/big-number";

import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

reportWebVitals();

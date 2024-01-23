import React from "react";
import { Outlet } from "react-router-dom";

import { Header, Sidebar, Column } from "components";

import { StyledOutletContainer } from "./styled";

const DefaultOutlet: React.FC = () => {
  return (
    <StyledOutletContainer>
      <Sidebar />
      <Column width="100%">
        <Header />
        <Outlet />
      </Column>
    </StyledOutletContainer>
  );
};

export default DefaultOutlet;

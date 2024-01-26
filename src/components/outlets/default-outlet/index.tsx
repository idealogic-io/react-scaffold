import React from "react";
import { Outlet } from "react-router-dom";

import { Header, Sidebar, Column, Box } from "components";

import { StyledOutletContainer } from "./styled";

const DefaultOutlet: React.FC = () => {
  return (
    <StyledOutletContainer>
      <Sidebar />
      <Column width="100%">
        <Header />
        <Box overflowY="scroll" marginTop="50px" marginBottom="50px">
          <Outlet />
        </Box>
      </Column>
    </StyledOutletContainer>
  );
};

export default DefaultOutlet;

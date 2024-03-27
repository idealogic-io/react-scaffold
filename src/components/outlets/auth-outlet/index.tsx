import React from "react";
import { Outlet } from "react-router-dom";

import { Flex, Page } from "components";

const AuthOutlet: React.FC = () => {
  return (
    <Page maxWidth="100%" px="0px">
      <Flex justifyContent="center" alignItems="center" minHeight="100vh">
        <Flex width="50%" $backgroundColor="monochrome100" borderRadius="10px" p="24px">
          <Outlet />
        </Flex>
      </Flex>
    </Page>
  );
};

export default AuthOutlet;

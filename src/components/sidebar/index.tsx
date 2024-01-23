import React from "react";

import { Flex } from "components";
import { IdealogicIcon } from "components/svg";

import { StyledSidebarContainer } from "./styled";

const Sidebar: React.FC = () => {
  return (
    <StyledSidebarContainer>
      <Flex justifyContent="center">
        <IdealogicIcon width="150px" />
      </Flex>
    </StyledSidebarContainer>
  );
};

export default Sidebar;

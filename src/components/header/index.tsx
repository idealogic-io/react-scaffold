import React from "react";

import { StyledHeaderContainer, StyledHeaderInternalContainer } from "./styled";

const Header: React.FC = () => {
  return (
    <StyledHeaderContainer>
      <StyledHeaderInternalContainer></StyledHeaderInternalContainer>
    </StyledHeaderContainer>
  );
};

export default Header;

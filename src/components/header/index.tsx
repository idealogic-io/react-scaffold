import React from "react";

import { WalletButton } from "components";

import { StyledHeaderContainer, StyledHeaderInternalContainer } from "./styled";

const Header: React.FC = () => {
  return (
    <StyledHeaderContainer>
      <StyledHeaderInternalContainer>
        <WalletButton />
      </StyledHeaderInternalContainer>
    </StyledHeaderContainer>
  );
};

export default Header;

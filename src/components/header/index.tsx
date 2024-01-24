import React from "react";
import { useAccount } from "wagmi";

import { FlexGap, WalletButton, SignInButton, LanguageDropdown } from "components";

import { StyledHeaderContainer, StyledHeaderInternalContainer } from "./styled";

const Header: React.FC = () => {
  const { isConnected } = useAccount();

  return (
    <StyledHeaderContainer>
      <StyledHeaderInternalContainer>
        <FlexGap height="100%" flexDirection="row-reverse" alignItems="center" gap="16px">
          {isConnected && <SignInButton />}
          <WalletButton />
          <LanguageDropdown />
        </FlexGap>
      </StyledHeaderInternalContainer>
    </StyledHeaderContainer>
  );
};

export default Header;

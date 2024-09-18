import React from "react";

import { StyledContainer } from "./styled";
import { Container, Text } from "components";

const Header: React.FC = () => {
  return (
    <StyledContainer>
      <Container>
        <Text color="monochrome0">This is header</Text>
      </Container>
    </StyledContainer>
  );
};

export default Header;

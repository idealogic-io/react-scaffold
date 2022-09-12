import React from "react";
import { Link as StyledLink, Box } from "components";
import { AddIcon } from "components/svg";

export default {
  title: "Components/Link",
};

export const Link: React.FC = () => {
  return (
    <>
      <Box>
        <StyledLink href="/">Default</StyledLink>
      </Box>
      <Box>
        <StyledLink href="/" color="text">
          Custom color
        </StyledLink>
      </Box>
      <Box>
        <StyledLink external href="/">
          External
        </StyledLink>
      </Box>
      <Box>
        <StyledLink href="/">
          With icon
          <AddIcon />
        </StyledLink>
      </Box>
    </>
  );
};

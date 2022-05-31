import { Text } from "components";
import React from "react";

import { StyledLoader } from "./StyledLoader";

const Loader = () => {
  return (
    <StyledLoader>
      <Text as="h1" fontSize="32px">
        Loading ...
      </Text>
    </StyledLoader>
  );
};

export default Loader;

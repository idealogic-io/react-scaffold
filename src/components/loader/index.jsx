import { Text } from "components";
import React from "react";

import { LoaderStyled } from "./styles";

const Loader = () => {
  return (
    <LoaderStyled>
      <Text as="h1" fontSize="32px">
        Loading ...
      </Text>
    </LoaderStyled>
  );
};

export default Loader;

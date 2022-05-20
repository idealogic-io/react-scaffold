import { Text } from "components";
import React from "react";

import { LoaderStyled } from "./styles";

const Loader = () => {
  return (
    <LoaderStyled>
      <Text as="h1" fSize="title1">
        Loading ...
      </Text>
    </LoaderStyled>
  );
};

export default Loader;

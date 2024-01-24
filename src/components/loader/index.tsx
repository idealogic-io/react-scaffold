import React from "react";

import { Flex } from "components";
import { SpinnerIcon } from "components/svg";

import { LoaderProps } from "./types";

const Loader: React.FC<LoaderProps> = props => {
  return (
    <Flex justifyContent="center" alignItems="center" height="100vh" {...props}>
      <SpinnerIcon width="44px" />
    </Flex>
  );
};

export default Loader;

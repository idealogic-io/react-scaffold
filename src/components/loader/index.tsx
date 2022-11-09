import React from "react";

import { Flex } from "components";
import { SpinnerIcon } from "components/svg";

const Loader: React.FC = () => {
  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <SpinnerIcon width="44px" />
    </Flex>
  );
};

export default Loader;

import React from "react";
import { Flex } from "components";
import { SpinnerIcon } from "components/svg";

const Loader: React.FC = () => {
  return (
    <Flex width="100vw" height="100vh" justifyContent="center" alignItems="center">
      <SpinnerIcon width="100px" height="100px" color="black" />
    </Flex>
  );
};

export default Loader;

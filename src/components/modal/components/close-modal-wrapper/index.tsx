import React from "react";

import { Flex } from "components";
import { CloseIcon } from "components/svg";

import { CloseModalWrapperProps } from "./types";

const CloseModalWrapper: React.FC<CloseModalWrapperProps> = ({ children, closeModalHandler, ...props }) => {
  return (
    <Flex width="100%" justifyContent="flex-end" alignItems="center" {...props}>
      <Flex alignItems="center" width="100%">
        {children}
      </Flex>

      <CloseIcon width="24px" height="24px" cursor="pointer" onClick={closeModalHandler} />
    </Flex>
  );
};

export default CloseModalWrapper;

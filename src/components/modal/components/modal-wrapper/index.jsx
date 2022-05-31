import React from "react";
import { createPortal } from "react-dom";

import { StyledModalWrapper, StyledModalContainer } from "./StyledModalWrapper";

const modalRoot = document.getElementById("modal");

const ModalWrapper = ({ children, hideModalHandler }) => {
  const onParentContainerClick = e => {
    return e.stopPropagation();
  };
  if (modalRoot) {
    return createPortal(
      <StyledModalWrapper onClick={hideModalHandler}>
        <StyledModalContainer onClick={onParentContainerClick}>{children}</StyledModalContainer>
      </StyledModalWrapper>,
      modalRoot,
    );
  }

  return null;
};

export default ModalWrapper;

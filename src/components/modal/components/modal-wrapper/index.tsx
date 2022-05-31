import React from "react";
import { createPortal } from "react-dom";

import { StyledModalWrapper, StyledModalContainer } from "./StyledModalWrapper";
import { ModalWrapperProps } from "./types";

const modalRoot = document.getElementById("modal");

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, hideModalHandler }) => {
  const onParentContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    return event.stopPropagation();
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

import React from "react";
import { ModalStyled, ModalContainer } from "./styles";

const modalRoot = document.getElementById("modal");

const ModalWrapper = ({ children, hideModalHandler }) => {
  const onParentContainerClick = e => {
    return e.stopPropagation();
  };

  return createPortal(
    <ModalStyled onClick={hideModalHandler}>
      <ModalContainer onClick={onParentContainerClick}>{children}</ModalContainer>
    </ModalStyled>,
    modalRoot,
  );
};

export default ModalWrapper;

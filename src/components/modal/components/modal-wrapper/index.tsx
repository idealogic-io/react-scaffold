import React from "react";
import { createPortal } from "react-dom";

import { StyledModalWrapper, StyledModalContainer } from "./StyledModalWrapper";
import { ModalWrapperProps } from "./types";
import { appearanceAnimationMap, appearanceAnimationVariants } from "theme";

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, id, hideModalHandler }) => {
  const modalRoot = document.getElementById(id);

  const onParentContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    return event.stopPropagation();
  };

  if (modalRoot) {
    return createPortal(
      <StyledModalWrapper
        key="modal"
        {...appearanceAnimationMap}
        variants={appearanceAnimationVariants}
        transition={{ duration: 0.5 }}
        onClick={hideModalHandler}
      >
        <StyledModalContainer onClick={onParentContainerClick}>{children}</StyledModalContainer>
      </StyledModalWrapper>,

      modalRoot,
    );
  }
  return null;
};

export default ModalWrapper;

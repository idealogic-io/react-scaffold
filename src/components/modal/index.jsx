import React, { useEffect } from "react";

import { hideModal, MODAL_NAMES } from "store/reducers/modal";
import { useAppDispatch, useAppSelector } from "store/store";

import { ModalWrapper } from "components";

const component = {
  [MODAL_NAMES.someModal]: () => <div style={{ height: 300, width: 250, backgroundColor: "violet" }}>Some Modal</div>,
};

const Modal = () => {
  const { modalName, rootId, props } = useAppSelector(state => state.modal);

  const dispatch = useAppDispatch();
  const ModalComponent = modalName ? component[modalName] : null;

  const hideModalHandler = () => {
    dispatch(hideModal());
  };

  useEffect(() => {
    if (modalName) {
      document.body.style.overflowY = "hidden";
    } else if (!modalName) {
      document.body.style.overflowY = "auto";
    }
  }, [modalName]);

  if (!ModalComponent) {
    return null;
  }

  return (
    <ModalWrapper hideModalHandler={hideModalHandler} id={rootId}>
      <ModalComponent {...props} />
    </ModalWrapper>
  );
};

export default Modal;

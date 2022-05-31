import React from "react";

import { hideModal, MODAL_NAMES } from "store/reducers/modal";
import { useAppDispatch, useAppSelector } from "store/store";

import { ModalWrapper } from "components";

const component = {
  [MODAL_NAMES.someModal]: () => <div>Some Modal</div>,
};

const Modal = () => {
  const { modalName } = useAppSelector(state => state.modal);

  const dispatch = useAppDispatch();
  const ModalComponent = modalName ? component[modalName] : null;

  const hideModalHandler = () => {
    dispatch(hideModal());
  };

  if (!ModalComponent) {
    return null;
  }

  return (
    <ModalWrapper hideModalHandler={hideModalHandler}>
      <ModalComponent />
    </ModalWrapper>
  );
};

export default Modal;

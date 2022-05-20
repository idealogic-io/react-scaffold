import React from "react";

import { useDispatch } from "react-redux";
import { hideModal, MODAL_NAMES } from "store/reducers/modal";
import { useAppSelector } from "store/store";

import ModalWrapper from "components/modal/components/modal-wrapper";

const component = {
  [MODAL_NAMES.someModal]: () => <div>Some Modal</div>,
};

const Modal = () => {
  const { modalName } = useAppSelector(state => state.modal);

  const dispatch = useDispatch();
  const ModalComponent = component[modalName];

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

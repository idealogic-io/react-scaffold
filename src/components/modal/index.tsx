import React from "react";

import { hideModal, ModalNames } from "store/reducers/modal";
import { useAppDispatch, useAppSelector } from "store/store";

import { ModalWrapper } from "components";

const component = {
  [ModalNames.someModal]: () => <div>Some Modal</div>,
};

const Modal: React.FC = () => {
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

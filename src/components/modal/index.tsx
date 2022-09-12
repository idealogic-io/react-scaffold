import React, { useEffect } from "react";

import { hideModal, ModalNames } from "store/reducers/modal";
import { useAppDispatch, useAppSelector } from "store/store";

import { ModalWrapper, TestModal } from "./components";

const component = {
  [ModalNames.testModal]: () => <TestModal />,
};

const Modal: React.FC = () => {
  const { modalName, rootId, props } = useAppSelector(state => state.modal);
  const modalProps = props ? props : {};

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
      <ModalComponent {...modalProps} />
    </ModalWrapper>
  );
};

export default Modal;

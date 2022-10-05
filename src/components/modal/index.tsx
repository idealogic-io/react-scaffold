import React, { useEffect } from "react";
import { AnimatePresence, usePresence } from "framer-motion";

import { hideModal, ModalNames } from "store/reducers/modal";
import { useAppDispatch, useAppSelector } from "store/store";

import { ModalWrapper, TestModal } from "./components";

const component = {
  [ModalNames.testModal]: () => <TestModal />,
};

const Modal: React.FC = () => {
  const { modalName, rootId } = useAppSelector(state => state.modal);
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    !isPresent && setTimeout(safeToRemove, 1000);
  }, [isPresent]);

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
    <AnimatePresence>
      {ModalComponent && (
        <ModalWrapper hideModalHandler={hideModalHandler} id={rootId}>
          <ModalComponent />
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
};

export default Modal;

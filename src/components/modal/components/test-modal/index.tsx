import React from "react";

import { Text, Heading } from "components";
import { StyledModalWrapper } from "../styled";
import CloseModalWrapper from "../close-modal-wrapper";

import { useAppDispatch, useAppSelector } from "store/store";
import { hideModal } from "store/modal";

import { ModalState } from "store/modal/types";

import { TestModalProps } from "./types";

const TestModal: React.FC = () => {
  const { props } = useAppSelector(state => state.modal as unknown as ModalState<TestModalProps>);

  const dispatch = useAppDispatch();

  const closeModalHandler = () => {
    dispatch(hideModal());
  };

  return (
    <StyledModalWrapper>
      <CloseModalWrapper closeModalHandler={closeModalHandler} />

      <Heading textAlign="center" scale="h5" as="h5">
        Header with custom prop {props?.title}
      </Heading>
      <Text>This is a test modal</Text>
    </StyledModalWrapper>
  );
};

export default TestModal;

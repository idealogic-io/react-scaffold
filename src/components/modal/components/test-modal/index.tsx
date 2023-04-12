import React from "react";
import styled from "styled-components";

import { Flex, Text, Button, Heading } from "components";

import { useAppDispatch, useAppSelector } from "store/store";
import { hideModal } from "store/modal";
import { ModalState } from "store/modal/types";

const StyledTestModal = styled(Flex)`
  height: 300px;
  width: 250px;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export type TestModalProps = {
  title: string;
};

const TestModal: React.FC = () => {
  const { props } = useAppSelector(state => state.modal as unknown as ModalState<TestModalProps>);

  const dispatch = useAppDispatch();

  const closeModalHandler = () => {
    dispatch(hideModal());
  };

  return (
    <StyledTestModal>
      <Heading textAlign="center" scale="h5" as="h5">
        Header with custom prop {props?.title}
      </Heading>
      <Text>This is a test modal</Text>
      <Button onClick={closeModalHandler}>Close modal</Button>
    </StyledTestModal>
  );
};

export default TestModal;

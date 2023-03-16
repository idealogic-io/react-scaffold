import { ModalNames, showModal } from "store/modal";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

import { ShowModalProps } from "store/modal/types";
import { useAppDispatch } from "store/store";

import { Button, Box } from "components";

import { TestModalProps } from "./components/test-modal";

export default {
  title: "Components/Modals",
};

export const Modals: React.FC = () => {
  const dispatch = useAppDispatch();
  const rootId = "modal-story";

  const onShowModal = (modalName: keyof typeof ModalNames) => {
    const _showModal = showModal as ActionCreatorWithPayload<ShowModalProps<TestModalProps>, string>;

    dispatch(_showModal({ modalName, rootId, props: { title: "Test" } }));
  };

  return (
    <Box id={rootId}>
      {Object.values(ModalNames).map(el => (
        <Button key={el} onClick={() => onShowModal(el)}>
          Show {el}
        </Button>
      ))}
    </Box>
  );
};

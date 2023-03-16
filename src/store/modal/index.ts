import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalNames, ModalState, ShowModalProps } from "./types";

const initialState: ModalState<undefined> = {
  modalName: null,
  rootId: "modal",
  props: undefined,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: <T>(state: ModalState<T>, action: PayloadAction<ShowModalProps<T>>) => {
      state.modalName = action.payload.modalName;
      state.rootId = action.payload.rootId ? action.payload.rootId : "modal";
      state.props = action.payload.props;
    },

    hideModal: () => initialState,
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export { ModalNames };
export default modalSlice;

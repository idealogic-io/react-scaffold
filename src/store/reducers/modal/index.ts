import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalNames, ModalState } from "./types";

const initialState: ModalState = {
  modalName: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<keyof typeof ModalNames>) => {
      state.modalName = action.payload;
    },

    hideModal: () => initialState,
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export { ModalNames };
export default modalSlice;

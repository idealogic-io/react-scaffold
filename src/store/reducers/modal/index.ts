import { createSlice } from "@reduxjs/toolkit";
import { ModalNames, ModalState } from "./types";

const initialState: ModalState = {
  modalName: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.modalName = action.payload;
    },

    hideModal: () => initialState,
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export { ModalNames };
export default modalSlice;

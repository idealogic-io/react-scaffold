import { createSlice } from "@reduxjs/toolkit";

export const MODAL_NAMES = {
  someModal: "someModal",
};

const initialState = {
  modalName: "",
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
export default modalSlice.reducer;

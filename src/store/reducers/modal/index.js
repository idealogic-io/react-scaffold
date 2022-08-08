import { createSlice } from "@reduxjs/toolkit";

export const MODAL_NAMES = {
  someModal: "someModal",
};

const initialState = {
  modalName: null,
  rootId: null,
  props: undefined,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.modalName = action.payload.modalName;
      state.rootId = action.payload.rootId ? action.payload.rootId : "modal";
      state.props = action.payload.props;
    },

    hideModal: () => initialState,
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice;

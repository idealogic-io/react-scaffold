export type ModalState = {
  modalName: null | keyof typeof ModalNames;
};

export enum ModalNames {
  someModal = "someModal",
}

export type ModalState<T> = {
  modalName: null | keyof typeof ModalNames;
  rootId: string;
  props?: T;
};

export type ShowModalProps<T> = {
  modalName: ModalState<T>["modalName"];
  rootId?: ModalState<T>["rootId"];
  props?: T;
};

export enum ModalNames {
  testModal = "testModal",
}

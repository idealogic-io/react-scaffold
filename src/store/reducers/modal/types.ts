export type ModalState<T> = {
  modalName: null | keyof typeof ModalNames;
  rootId: string;
  props?: T;
};

export type ShowModalProps<T> = {
  modalName: ModalState<unknown>["modalName"];
  rootId?: ModalState<unknown>["rootId"];
  props?: T;
};

export enum ModalNames {
  testModal = "testModal",
}

export type ModalState<T> = {
  modalName: null | keyof typeof ModalNames;
  rootId: string;
  props?: T;
};

export type ShowModalProps<T> = {
  modalName: ModalState<undefined>["modalName"];
  rootId?: ModalState<undefined>["rootId"];
  props?: T;
};

export enum ModalNames {
  testModal = "testModal",
}

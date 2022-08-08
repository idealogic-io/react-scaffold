import { PropsWithChildren } from "react";
import { ModalState } from "store/reducers/modal/types";

export interface ModalWrapperProps
  extends PropsWithChildren<{
    hideModalHandler: () => void;
  }> {
  id: string;
}

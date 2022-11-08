import { PropsWithChildren } from "react";

export interface ModalWrapperProps
  extends PropsWithChildren<{
    hideModalHandler: () => void;
  }> {
  id: string;
}

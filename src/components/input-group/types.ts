import { ReactElement } from "react";
import { SpaceProps } from "styled-system";

import { Scales } from "components/input/types";

export interface InputGroupProps extends SpaceProps {
  scale?: Scales;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  children: JSX.Element;
  error?: string;
  label?: string;
  isTouched?: boolean;
  disabled?: boolean;
}

export type StyledInputGroupProps = {
  hasStartIcon: boolean;
  hasEndIcon: boolean;
  disabled?: boolean;
  isError?: boolean;
};

export type InputIconProps = { scale: Scales };
export type InputErrorProps = { scale: Scales; iconWidth: number; disabled?: boolean };

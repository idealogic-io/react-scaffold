import { ReactElement } from "react";
import { SpaceProps } from "styled-system";

import { InputProps, Scales } from "components/input/types";

export interface InputGroupProps extends SpaceProps {
  scale?: Scales;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  children: JSX.Element;
  error?: string;
  label?: string;
  isTouched?: boolean;
}

export type StyledInputGroupProps = { scale: Scales; hasStartIcon: boolean; hasEndIcon: boolean };

export type InputIconProps = { scale: Scales; isEndIcon?: boolean };

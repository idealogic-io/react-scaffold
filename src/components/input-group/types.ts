import { ReactElement } from "react";
import { SpaceProps } from "styled-system";

import { Scales } from "components/input/types";

export interface InputGroupProps extends SpaceProps {
  scale?: Scales;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  children: JSX.Element;
}

export type StyledInputGroupProps = { scale: Scales; hasStartIcon: boolean; hasEndIcon: boolean };

export type InputIconProps = { scale: Scales; isEndIcon?: boolean };

import { ElementType } from "react";
import { DefaultTheme } from "styled-components";
import { PolymorphicComponentProps } from "types";

export interface InputRangeProps {
  onValueChanged?: (arg: number) => void;
  onFinishDrag?: (arg: number) => void;
}

export type InputProps<P extends ElementType = "input"> = PolymorphicComponentProps<P, InputRangeProps>;

export interface ThemedProps extends InputProps {
  theme: DefaultTheme;
}

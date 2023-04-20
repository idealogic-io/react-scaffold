import { ElementType } from "react";
import { PolymorphicComponentProps } from "types";

export interface InputRangeProps {
  onValueChanged?: (arg: number) => void;
  onFinishDrag?: (arg: number) => void;
}

export type StyledRangeInputProps = {
  afterThumbWidth: number;
};

export type InputProps<P extends ElementType = "input"> = PolymorphicComponentProps<P, InputRangeProps>;
export type StyledInputProps<P extends ElementType = "input"> = PolymorphicComponentProps<P, StyledRangeInputProps>;

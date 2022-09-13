import { InputProps } from "components/input/types";

export interface InputNumericProps extends InputProps {
  value: string;
  onUserInput: (value: string) => void;
}

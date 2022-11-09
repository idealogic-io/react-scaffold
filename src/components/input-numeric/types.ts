import { InputProps } from "components/input/types";

export interface InputNumericProps extends InputProps {
  value: string;
  placeholder?: string;
  onUserInput: (value: string) => void;
}

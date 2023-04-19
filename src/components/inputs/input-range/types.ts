export type InputRangeProps = {
  name?: string;
  value: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  onValueChanged: (arg: number) => void;
};

export type StyledRangeInputProps = {
  afterThumbWidth: number;
};

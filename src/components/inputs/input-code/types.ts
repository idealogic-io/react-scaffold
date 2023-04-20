export type CursorProps = { cursorSymbol?: string; delay?: number; isLastNFocus: boolean | undefined; value: string };

export type CellsProps = {
  cellCount: number;
  value: string;
  isFocused: boolean | undefined;
  isError: boolean;
  width?: number;
  heigh?: number;
};

export type InputCodeProps = {
  onUserInput: (value: string) => void;
  cellCount?: number;
  isFocused: boolean | undefined;
  isError: boolean;
  cellWidth?: number;
  cellHeigh?: number;
};

export type StyledNumericInputProps = {
  value: string;
  isFocusedValue: boolean | undefined;
  isError: boolean;
  width: number;
  heigh: number;
};

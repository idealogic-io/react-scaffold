import { LayoutProps } from "styled-system";

export type CursorProps = { cursorSymbol?: string; delay?: number; isLastNFocus: boolean | undefined; value: string };

export interface CellsProps extends Omit<InputCodeProps, "onUserInput"> {
  value: string;
}

export interface InputCodeProps {
  onUserInput: (value: string) => void;
  cellCount: number;
  isFocused: boolean | undefined;
  isError: boolean;
  cellWidth?: LayoutProps["width"];
  cellHeight?: LayoutProps["height"];
}

export interface StyledNumericInputProps extends LayoutProps {
  value: string;
  isFocusedValue: boolean | undefined;
  isError: boolean;
}

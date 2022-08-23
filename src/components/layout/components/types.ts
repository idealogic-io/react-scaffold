import { HTMLAttributes } from "react";
import {
  BackgroundProps,
  BorderProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  GridProps as _GridProps,
} from "styled-system";

export interface BoxProps
  extends BackgroundProps,
    BorderProps,
    LayoutProps,
    PositionProps,
    SpaceProps,
    HTMLAttributes<HTMLDivElement> {}

export interface FlexProps extends BoxProps, FlexboxProps {}

export interface GridProps extends FlexProps, _GridProps {}

export type AutoColumnProps = {
  gap?: "sm" | "md" | "lg" | string;
  justify?: "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" | "space-between";
};

export interface ColumnProps extends SpaceProps, FlexProps {}
export interface FlexGapProps extends FlexProps {
  gap?: string;
  rowGap?: string;
  columnGap?: string;
}

export type RowProps = {
  width?: string;
  align?: string;
  justify?: string;
  padding?: string;
  border?: string;
  borderRadius?: string;
};

export type AutoRowProps = { gap?: string; justify?: string };

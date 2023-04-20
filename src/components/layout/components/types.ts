import { HTMLAttributes, PropsWithChildren } from "react";
import { DefaultTheme } from "styled-components";

import { BorderProps, FlexboxProps, LayoutProps, PositionProps, SpaceProps } from "styled-system";
import { Colors } from "theme/types";

export interface ColumnProps extends SpaceProps, FlexboxProps, LayoutProps {}

export interface BoxProps extends BorderProps, LayoutProps, PositionProps, SpaceProps, HTMLAttributes<HTMLDivElement> {
  $backgroundColor?: keyof Colors;
  ellipsis?: boolean;
  cursor?: React.CSSProperties["cursor"];
  pointerEvents?: React.CSSProperties["pointerEvents"];
}

export interface BoxThemedProps extends BoxProps {
  theme: DefaultTheme;
}

export interface FlexProps extends BoxProps, FlexboxProps {}

export interface PageProps extends PropsWithChildren<BoxProps> {}

export interface FlexGapProps extends FlexProps {
  gap?: string;
  rowGap?: string;
  columnGap?: string;
}
export interface RowProps extends FlexProps, LayoutProps, SpaceProps {
  border?: string;
  borderRadius?: string;
}

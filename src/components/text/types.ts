import { DefaultTheme } from "styled-components";
import { LayoutProps, SpaceProps, TypographyProps, OpacityProps, FlexboxProps, ResponsiveValue } from "styled-system";

import { Colors, FontWeight } from "theme/types";

export interface ThemedProps extends TextProps {
  theme: DefaultTheme;
}

export const scales = {
  body1: "body1",
  body2: "body2",
  body3: "body3",
  caption1: "caption1",
  caption2: "caption2",
} as const;

export type Scales = (typeof scales)[keyof typeof scales];

export interface TextProps extends SpaceProps, TypographyProps, LayoutProps, OpacityProps, FlexboxProps {
  color?: keyof Colors;
  ellipsis?: boolean;
  $fontWeight?: ResponsiveValue<keyof FontWeight>;
  textTransform?: "uppercase" | "lowercase" | "capitalize";
  textScale?: ResponsiveValue<Scales>;
  direction?: "ltr" | "rtl";
  wordBreak?: React.CSSProperties["wordBreak"];
}

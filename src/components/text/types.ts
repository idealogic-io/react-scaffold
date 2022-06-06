import { DefaultTheme } from "styled-components";
import { LayoutProps, SpaceProps, TypographyProps, OpacityProps } from "styled-system";

import { Colors } from "theme/types";

export interface ThemedProps extends TextProps {
  theme: DefaultTheme;
}

export interface TextProps extends SpaceProps, TypographyProps, LayoutProps, OpacityProps {
  color?: keyof Colors;
  ellipsis?: boolean;
  bold?: boolean;
  medium?: boolean;
  textTransform?: "uppercase" | "lowercase" | "capitalize";
}

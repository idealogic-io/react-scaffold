import { DefaultTheme } from "styled-components";
import { LayoutProps, SpaceProps, TypographyProps, OpacityProps } from "styled-system";

import { Colors, FontWeight } from "theme/types";

export interface ThemedProps extends TextProps {
  theme: DefaultTheme;
}

export interface TextProps extends SpaceProps, TypographyProps, LayoutProps, OpacityProps {
  color?: keyof Colors;
  ellipsis?: boolean;
  $fontWeight?: keyof FontWeight;
  textTransform?: "uppercase" | "lowercase" | "capitalize";
}

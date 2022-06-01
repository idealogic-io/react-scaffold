import { DefaultTheme } from "styled-components";
import { LayoutProps, SpaceProps, TypographyProps, OpacityProps } from "styled-system";

import { FStyles } from "theme/types";
import { Colors } from "theme/types";

export interface ThemedProps extends TextProps {
  theme: DefaultTheme;
}

export interface TextProps extends SpaceProps, TypographyProps, LayoutProps, OpacityProps {
  color?: keyof Colors;
  ellipsis?: boolean;
  fStyle?: FStyles;
  textTransform?: "uppercase" | "lowercase" | "capitalize";
}

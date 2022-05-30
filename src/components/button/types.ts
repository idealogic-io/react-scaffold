import { ElementType, ReactNode } from "react";
import { DefaultTheme } from "styled-components";
import { LayoutProps, SpaceProps } from "styled-system";

import { Colors } from "theme/types";
import { FCWithChildren } from "types";

export const variants = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
} as const;

export const scales = {
  MD: "md",
  SM: "sm",
} as const;

export type Scale = typeof scales[keyof typeof scales];
export type Variant = typeof variants[keyof typeof variants];

export interface ThemedProps extends ButtonProps {
  theme: DefaultTheme;
}

export interface ButtonProps extends LayoutProps, SpaceProps, FCWithChildren {
  as?: "a" | "button" | ElementType;
  external?: boolean;
  isLoading?: boolean;
  scale?: Scale;
  variant?: Variant;
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  color?: keyof Colors;
}

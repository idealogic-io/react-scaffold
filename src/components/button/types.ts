import { SvgProps } from "components/svg/types";
import { ElementType, PropsWithChildren, ReactNode } from "react";
import { LayoutProps, SpaceProps } from "styled-system";
import { HSL } from "theme/types";

import { PolymorphicComponentProps } from "types";

export const variants = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
} as const;

export const scales = {
  SM: "sm",
  MD: "md",
  LG: "lg",
} as const;

export const accentColor = {
  accent: "accent",
  success: "success",
  warning: "warning",
  error: "error",
} as const;

export type Scale = typeof scales[keyof typeof scales];
export type AccentColor = typeof accentColor[keyof typeof accentColor];
export type Variant = typeof variants[keyof typeof variants];

export interface BaseButtonProps
  extends LayoutProps,
    SpaceProps,
    PropsWithChildren<{
      as?: "a" | "button" | ElementType;
      external?: boolean;
      isLoading?: boolean;
      scale?: Scale;
      variant?: Variant;
      accentColor?: AccentColor;
      disabled?: boolean;
      startIcon?: ReactNode & SvgProps;
      endIcon?: ReactNode & SvgProps;
      hsl?: keyof HSL;
    }> {}

export type ButtonProps<P extends ElementType = "button"> = PolymorphicComponentProps<P, BaseButtonProps>;

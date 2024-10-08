import { ElementType, PropsWithChildren, ReactNode } from "react";
import { LayoutProps, SpaceProps } from "styled-system";
import { DefaultTheme } from "styled-components";

import { Colors } from "theme/types";
import { SvgProps } from "components/svg/types";
import { PolymorphicComponentProps } from "types";

export const variants = {
  PRIMARY: "primary",
  OUTLINE: "outline",
} as const;

export const scales = {
  SM: "sm",
  MD: "md",
  LG: "lg",
} as const;

export type Scale = (typeof scales)[keyof typeof scales];
export type Variant = (typeof variants)[keyof typeof variants];

export interface BaseButtonProps
  extends LayoutProps,
    SpaceProps,
    PropsWithChildren<{
      as?: "a" | "button" | ElementType;
      external?: boolean;
      isLoading?: boolean;
      scale?: Scale;
      variant?: Variant;
      color?: keyof Colors;
      hoverColor?: keyof Colors;
      disabled?: boolean;
      startIcon?: ReactNode & SvgProps;
      endIcon?: ReactNode & SvgProps;
    }> {}

export type ButtonProps<P extends ElementType = "button"> = PolymorphicComponentProps<P, BaseButtonProps>;

export interface ThemedProps extends ButtonProps {
  theme: DefaultTheme;
}

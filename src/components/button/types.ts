import { SvgProps } from "components/svg/types";
import { ElementType, PropsWithChildren, ReactNode } from "react";
import { LayoutProps, SpaceProps } from "styled-system";

import { Colors } from "theme/types";
import { PolymorphicComponentProps } from "types";

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

export interface BaseButtonProps
  extends LayoutProps,
    SpaceProps,
    PropsWithChildren<{
      as?: "a" | "button" | ElementType;
      external?: boolean;
      isLoading?: boolean;
      scale?: Scale;
      variant?: Variant;
      disabled?: boolean;
      startIcon?: ReactNode & SvgProps;
      endIcon?: ReactNode & SvgProps;
      color?: keyof Colors;
    }> {}

export type ButtonProps<P extends ElementType = "button"> = PolymorphicComponentProps<P, BaseButtonProps>;

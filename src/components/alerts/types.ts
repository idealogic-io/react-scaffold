import { PropsWithChildren } from "react";
import { DefaultTheme } from "styled-components";

export const variants = {
  INFO: "info",
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warning",
} as const;

export type Variants = typeof variants[keyof typeof variants];

export interface ThemedAlert {
  variant?: AlertBannerProps["variant"];
  theme: DefaultTheme;
}

export interface AlertTextWithDescriptionProps
  extends PropsWithChildren<{
    text: string;
    description?: string;
  }> {}

export interface AlertBannerProps extends AlertTextWithDescriptionProps {
  variant?: Variants;
  onCloseClick?: () => void;
}

import { ReactNode } from "react";
import { SvgProps } from "components/svg/types";

export const variants = {
  rotateX: "rotateX",
  rotateY: "rotateY",
} as const;

export type Variant = keyof typeof variants;

export interface RotateIconProps {
  isToggled: boolean;
  firstIcon: ReactNode & SvgProps;
  secondIcon: ReactNode & SvgProps;
  variant: Variant;
  onClick?: () => void;
}

export interface StyledRotateIconProps extends Pick<RotateIconProps, "variant" | "isToggled"> {}

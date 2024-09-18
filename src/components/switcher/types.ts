import { TextProps } from "components/text/types";
import { CheckboxProps } from "../checkbox/types";

export const scales = {
  MD: "md",
  LG: "lg",
} as const;

export type Scale = (typeof scales)[keyof typeof scales];

export interface SwitcherProps extends CheckboxProps {
  scale?: Scale;
  labelProps?: TextProps;
}

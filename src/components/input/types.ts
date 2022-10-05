import { DefaultTheme } from "styled-components";
import { SpaceProps } from "styled-system";
import { Colors } from "theme/types";

export const scales = {
  SM: "sm",
  MD: "md",
  LG: "lg",
} as const;

export type Scales = typeof scales[keyof typeof scales];

export interface InputProps extends SpaceProps {
  scale?: Scales;
  $backgroundColor?: keyof Colors;
}

export interface ThemedProps extends InputProps {
  theme: DefaultTheme;
}

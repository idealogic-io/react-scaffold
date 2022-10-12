import { SVGAttributes } from "react";
import { DefaultTheme } from "styled-components";
import { SpaceProps } from "styled-system";
import { Colors } from "theme/types";

export interface SvgProps extends SVGAttributes<SVGElement>, SpaceProps {
  theme?: DefaultTheme;
  color?: keyof Colors;
  spin?: boolean;
}

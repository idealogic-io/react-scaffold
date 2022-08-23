import { AnchorHTMLAttributes } from "react";
import { TextProps } from "components/text/types";

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color">, TextProps {
  external?: boolean;
}

import styled from "styled-components";
import { space, typography, layout, opacity } from "styled-system";
import { TextProps, ThemedProps } from "./types";

export const getFontStyles = ({ theme, fStyle }: ThemedProps) => {
  if (fStyle) {
    return fStyle;
  }

  return theme.fontsStyles.mv.regular;
};

export const getTextColor = ({ theme, color }: ThemedProps) => {
  if (color && theme.colors[color]) {
    return theme.colors[color];
  }
  return theme.colors.text;
};

export const getEllipsis = ({ ellipsis }: ThemedProps) => {
  if (ellipsis) {
    return `white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;`;
  }
};

export const Text = styled.p<TextProps>`
  color: ${getTextColor};
  ${getEllipsis};
  ${space}
  ${typography}
  ${layout}
  ${opacity}
`;

export default Text;

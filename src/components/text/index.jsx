import styled from "styled-components";
import { space, typography, layout, opacity } from "styled-system";

export const getFontStyles = ({ theme, fStyle }) => {
  if (fStyle) {
    return fStyle;
  }

  return theme.fontsStyles.mv.regular;
};

export const getTextColor = ({ theme, color }) => {
  if (theme.colors[color]) {
    return theme.colors[color];
  }
  return theme.colors.text;
};

export const getEllipsis = ({ ellipsis }) => {
  if (ellipsis) {
    return `white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;`;
  }
};

export const Text = styled.p`
  color: ${getTextColor};
  ${getFontStyles};
  ${getEllipsis};
  ${space}
  ${typography}
  ${layout}
  ${opacity}
`;

export default Text;

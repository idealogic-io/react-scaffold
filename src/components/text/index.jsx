import styled from "styled-components";
import { space, typography, layout, opacity } from "styled-system";

export const getFontStyles = ({ theme, fStyle }) => {
  if (fStyle) {
    return fStyle;
  }

  return theme.fontsStyles.mv.regular;
};

export const getFontSize = ({ theme, fSize }) => {
  if (theme.fonSize[fSize]) {
    return theme.fonSize[fSize];
  }
  return theme.fonSize.text1;
};

export const getTextColor = ({ theme, color }) => {
  if (color) {
    return theme.colors[color];
  }
  return theme.colors.black;
};

export const getEllipsis = ({ ellipsis }) => {
  if (ellipsis) {
    return `white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;`;
  }
};

export const Text = styled.p`
  font-size: ${getFontSize};
  color: ${getTextColor};
  ${getFontStyles};
  ${getEllipsis};
  ${space}
  ${typography}
  ${layout}
  ${opacity}
`;

export default Text;

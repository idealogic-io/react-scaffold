import styled from "styled-components";
import { space, typography, layout, opacity } from "styled-system";

export const getFontWeight = ({ theme, bold, medium }) => {
  const { fontWeight } = theme;
  if (bold) {
    return fontWeight.bold;
  } else if (medium) {
    return fontWeight.medium;
  } else {
    return fontWeight.regular;
  }
};

export const getEllipsis = ({ ellipsis }) => {
  if (ellipsis) {
    return `white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;`;
  }
};

export const Text = styled.p`
  color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.text)};
  font-family: ${({ theme }) => theme.fonts.mv};
  font-weight: ${getFontWeight};
  ${getEllipsis};
  ${space}
  ${typography}
  ${layout}
  ${opacity}
`;

export default Text;

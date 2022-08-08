import styled from "styled-components";
import { space, typography, layout, opacity } from "styled-system";

export const getEllipsis = ({ ellipsis }) => {
  if (ellipsis) {
    return `white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;`;
  }
};

export const Text = styled.p`
  line-height: 1.375;

  color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.text)};
  font-family: ${({ theme }) => theme.fonts.mv};
  font-weight: ${({ theme, $fontWeight }) => ($fontWeight ? theme.fontWeight[$fontWeight] : theme.fontWeight.regular)};

  ${getEllipsis};
  ${space}
  ${typography}
  ${layout}
  ${opacity}
`;

export default Text;

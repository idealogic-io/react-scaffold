import styled from "styled-components";
import { space, typography, layout, opacity } from "styled-system";
import { TextProps, ThemedProps } from "./types";

export const getEllipsis = ({ ellipsis }: ThemedProps) => {
  if (ellipsis) {
    return `white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;`;
  }
};

export const Text = styled.p<TextProps>`
  color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.text)};
  font-family: ${({ theme }) => theme.fonts.mv};
  font-weight: ${({ theme, $fontWeight }) => ($fontWeight ? theme.fontWeight[$fontWeight] : theme.fontWeight.regular)};
  line-height: 1.375;
  ${getEllipsis}
  ${space}
  ${typography}
  ${layout}
  ${opacity}
`;

export default Text;

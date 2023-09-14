import styled, { css } from "styled-components";
import { space, typography, layout, opacity, flexbox } from "styled-system";
import { TextProps, ThemedProps } from "./types";
import { fontSizes, styles } from "./theme";

export const getEllipsis = ({ ellipsis }: ThemedProps) => {
  if (ellipsis) {
    return css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `;
  }
};

export const wordBreak = ({ wordBreak }: ThemedProps) => {
  if (wordBreak) {
    return css`
      word-break: ${wordBreak};
    `;
  }
};

export const Text = styled.p<TextProps>`
  color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.monochrome900)};
  font-weight: ${({ theme, $fontWeight }) => $fontWeight && theme.fontWeight[$fontWeight]};
  line-height: 1.375;
  font-family: ${({ theme }) => theme.fonts.mv};

  ${({ textScale }) => textScale && styles[textScale]};

  font-size: ${({ textScale }) => textScale && fontSizes[textScale].mobile};

  ${({ theme }) => theme.mediaQueries.tablet} {
    font-size: ${({ textScale }) => textScale && fontSizes[textScale].tablet};
  }
  ${({ theme }) => theme.mediaQueries.laptop} {
    font-size: ${({ textScale }) => textScale && fontSizes[textScale].laptop};
  }

  ${wordBreak}
  ${getEllipsis}
  ${space}
  ${typography}
  ${layout}
  ${opacity}
  ${flexbox}
`;

Text.defaultProps = { textScale: "body1" };

export default Text;

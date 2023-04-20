import styled from "styled-components";
import { space, typography, layout, opacity, flexbox } from "styled-system";
import { TextProps, ThemedProps } from "./types";
import { style } from "./theme";

export const getEllipsis = ({ ellipsis }: ThemedProps) => {
  if (ellipsis) {
    return `white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;`;
  }
};

export const wordBreak = ({ wordBreak }: ThemedProps) => {
  if (wordBreak) {
    return `word-break: ${wordBreak};`;
  }
};

export const Text = styled.p<TextProps>`
  color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.monochrome900)};
  font-weight: ${({ theme, $fontWeight }) => ($fontWeight ? theme.fontWeight[$fontWeight] : theme.fontWeight.regular)};
  line-height: 1.375;
  font-family: ${({ theme }) => theme.fonts.mv};

  direction: ${({ direction }) => direction};

  ${({ theme }) => theme.mediaQueries.mobileS} {
    font-size: ${({ textScale }) => textScale && style[textScale].fontSizeMobileS};
  }
  ${({ theme }) => theme.mediaQueries.tablet} {
    font-size: ${({ textScale }) => textScale && style[textScale].fontSizeTablet};
  }
  ${({ theme }) => theme.mediaQueries.laptop} {
    font-size: ${({ textScale }) => textScale && style[textScale].fontSizeLaptop};
  }

  ${wordBreak}
  ${getEllipsis}
  ${space}
  ${typography}
  ${layout}
  ${opacity}
  ${flexbox}
`;

export default Text;

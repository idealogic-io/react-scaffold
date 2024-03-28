import styled, { css } from "styled-components";
import { space, typography, layout, opacity, flexbox } from "styled-system";
import { fontWeights, styles } from "./theme";
import { getStylesFromResponsiveValue } from "utils";

import { Scales, TextProps, ThemedProps } from "./types";

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
  line-height: 1.375;
  font-family: ${({ theme }) => theme.fonts.merriweather};

  ${fontWeights}

  ${({ textScale }) => textScale && getStylesFromResponsiveValue<Scales>(textScale, styles)}

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

import styled from "styled-components";
import { Text } from "components";

import { style } from "./theme";
import { scales, HeadingProps } from "./types";

const Heading = styled(Text)<HeadingProps>`
  line-height: ${({ scale }) => scale && style[scale].lineHeight};

  ${({ theme }) => theme.mediaQueries.mobileS} {
    font-size: ${({ scale }) => scale && style[scale].fontSizeMobileS};
  }
  ${({ theme }) => theme.mediaQueries.tablet} {
    font-size: ${({ scale }) => scale && style[scale].fontSizeTablet};
  }
  ${({ theme }) => theme.mediaQueries.laptop} {
    font-size: ${({ scale }) => scale && style[scale].fontSizeLaptop};
  }
`;

Heading.defaultProps = {
  as: scales.h1,
  scale: scales.h1,
  $fontWeight: "bold",
};

export default Heading;

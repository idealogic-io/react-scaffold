import styled from "styled-components";
import { Text } from "components";

import { fontSizes, styles } from "./theme";
import { scales, HeadingProps } from "./types";

const Heading = styled(Text)<HeadingProps>`
  ${({ scale }) => scale && styles[scale]};

  font-size: ${({ scale }) => scale && fontSizes[scale].mobile};

  ${({ theme }) => theme.mediaQueries.tablet} {
    font-size: ${({ scale }) => scale && fontSizes[scale].tablet};
  }
  ${({ theme }) => theme.mediaQueries.laptop} {
    font-size: ${({ scale }) => scale && fontSizes[scale].laptop};
  }
`;

Heading.defaultProps = {
  as: scales.h1,
  scale: scales.h1,
  $fontWeight: "bold",
};

export default Heading;

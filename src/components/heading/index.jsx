import styled from "styled-components";
import { Text } from "components";
import { scales, style } from "./theme";

const Heading = styled(Text)`
  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: ${({ scale }) => scale && style[scale].fontSizeXSm};
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: ${({ scale }) => scale && style[scale].fontSizeLg};
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    font-size: ${({ scale }) => scale && style[scale].fontSizeXXl};
  }
`;

Heading.defaultProps = {
  as: scales.h1,
  scale: scales.h1,
  $fontWeight: "bold",
};

export default Heading;

import styled from "styled-components";
import { Text } from "components";
import { scales, HeadingProps } from "./types";

const style = {
  [scales.h1]: {
    fontSizeXXl: "32px",
    fontSizeLg: "28px",
    fontSizeXSm: "24px",
  },
  [scales.h2]: {
    fontSizeXXl: "28px",
    fontSizeLg: "24px",
    fontSizeXSm: "22px",
  },
  [scales.h3]: {
    fontSizeXXl: "24px",
    fontSizeLg: "20px",
    fontSizeXSm: "18px",
  },
  [scales.h4]: {
    fontSizeXXl: "20px",
    fontSizeLg: "16px",
    fontSizeXSm: "14px",
  },
  [scales.h5]: {
    fontSizeXXl: "16px",
    fontSizeLg: "14px",
    fontSizeXSm: "12px",
  },
  [scales.h6]: {
    fontSizeXXl: "14px",
    fontSizeLg: "12px",
    fontSizeXSm: "10px",
  },
};

const Heading = styled(Text)<HeadingProps>`
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

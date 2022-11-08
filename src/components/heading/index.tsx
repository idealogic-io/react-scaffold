import styled from "styled-components";
import { Text } from "components";
import { scales, HeadingProps } from "./types";

const style = {
  [scales.h1]: {
    fontSizeLaptop: "32px",
    fontSizeTablet: "28px",
    fontSizeMobileS: "24px",
  },
  [scales.h2]: {
    fontSizeLaptop: "28px",
    fontSizeTablet: "24px",
    fontSizeMobileS: "22px",
  },
  [scales.h3]: {
    fontSizeLaptop: "24px",
    fontSizeTablet: "20px",
    fontSizeMobileS: "18px",
  },
  [scales.h4]: {
    fontSizeLaptop: "20px",
    fontSizeTablet: "16px",
    fontSizeMobileS: "14px",
  },
  [scales.h5]: {
    fontSizeLaptop: "16px",
    fontSizeTablet: "14px",
    fontSizeMobileS: "12px",
  },
  [scales.h6]: {
    fontSizeLaptop: "14px",
    fontSizeTablet: "12px",
    fontSizeMobileS: "10px",
  },
};

const Heading = styled(Text)<HeadingProps>`
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

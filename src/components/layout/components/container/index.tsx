import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { border, layout, position, space } from "styled-system";

import { useThemeContext } from "context";

import { BoxProps } from "../types";

export const Box = styled.div<BoxProps>`
  background-color: ${({ theme, $backgroundColor }) => $backgroundColor && theme.colors[$backgroundColor]};
  ${border}
  ${layout}
  ${position}
  ${space}
`;

export const Container: React.FC<PropsWithChildren<BoxProps>> = ({ children, ...props }) => {
  const { theme } = useThemeContext();
  // TODO please take a look at 2 different points how to use media queries in markup
  // With array approach we can defined prop starting from the first query
  // min-width: 320px - 16px; min-width: 375px - 24px; etc.
  // with keys approach we can define prop only for a single media query
  // Pls run storybook and see the difference

  return (
    <Box
      // px={["16px", "24px", "32px", "80px"]}
      px={{ mobileS: "16px", mobileL: "24px" }}
      mx="auto"
      maxWidth={theme.siteWidth}
      {...props}
    >
      {children}
    </Box>
  );
};

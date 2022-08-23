import React from "react";
import styled from "styled-components";
import { background, border, flexbox, layout, position, space } from "styled-system";

import { useThemeContext } from "context";

import { BoxProps } from "../types";

export const Box = styled.div<BoxProps>`
  ${background}
  ${border}
  ${layout}
  ${position}
  ${space}
`;

export const Container: React.FC<BoxProps> = ({ children, ...props }) => {
  const { theme } = useThemeContext();

  return (
    <Box px={["16px", "24px"]} mx="auto" maxWidth={theme.siteWidth} {...props}>
      {children}
    </Box>
  );
};

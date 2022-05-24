import React from "react";
import styled from "styled-components";
import { background, border, layout, position, space } from "styled-system";

import { useThemeContext } from "context";

export const Box = styled.div`
  ${background}
  ${border}
  ${layout}
  ${position}
  ${space}
`;

export const Container = ({ children, ...props }) => {
  const { theme } = useThemeContext();

  return (
    <Box px={["16px", "24px"]} mx="auto" maxWidth={theme.siteWidth} {...props}>
      {children}
    </Box>
  );
};

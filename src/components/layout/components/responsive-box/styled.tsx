import styled from "styled-components";
import { Box } from "../container";
import { Flex } from "../flex";

export const ResponsiveBoxWrapper = styled(Box)<{ aspectRatio: number }>`
  position: relative;

  &::before {
    content: "";
    display: block;
    padding-top: ${({ aspectRatio }) => (1 / aspectRatio) * 100}%; /* Calculate padding based on aspect ratio */
  }
`;

export const ContentWrapper = styled(Flex)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
`;

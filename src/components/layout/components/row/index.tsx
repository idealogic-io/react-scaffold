import styled from "styled-components";
import { layout, space, flexbox } from "styled-system";

import { Box } from "../container";

import { RowProps } from "../types";

export const Row = styled(Box)<RowProps>`
  width: 100%;
  display: flex;
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  ${space}
  ${layout}
  ${flexbox}
`;

export const RowBetween = styled(Row)`
  justify-content: space-between;
`;

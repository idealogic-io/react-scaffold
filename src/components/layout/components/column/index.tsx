import styled from "styled-components";
import { flexbox, layout, space } from "styled-system";

import { Box } from "../container";

import { ColumnProps } from "../types";

export const Column = styled(Box)<ColumnProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  ${flexbox}
  ${space}
  ${layout}
`;

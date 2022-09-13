import styled from "styled-components";
import { flexbox, space } from "styled-system";
import { ColumnProps } from "../types";

export const Column = styled.div<ColumnProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  ${flexbox}
  ${space}
`;

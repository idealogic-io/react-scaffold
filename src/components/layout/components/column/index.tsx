import styled from "styled-components";
import { flexbox, space } from "styled-system";

import { AutoColumnProps, ColumnProps } from "../types";

export const Column = styled.div<ColumnProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  ${space}
  ${flexbox}
`;
export const ColumnCenter = styled(Column)`
  width: 100%;
  align-items: center;
`;

export const gridGap = {
  SM: "sm",
  MD: "md",
  LG: "lg",
};

export const AutoColumn = styled.div<AutoColumnProps>`
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: ${({ gap }) =>
    (gap === gridGap.SM && "8px") || (gap === gridGap.MD && "12px") || (gap === gridGap.LG && "24px") || gap};
  justify-items: ${({ justify }) => justify};
`;

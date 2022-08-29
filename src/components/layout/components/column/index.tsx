import styled from "styled-components";
import { AutoColumnProps } from "../types";

export const Column = styled.div<ColumnProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
export const ColumnCenter = styled(Column)<ColumnProps>`
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

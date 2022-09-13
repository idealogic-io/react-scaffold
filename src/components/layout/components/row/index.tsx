import styled from "styled-components";
import { space, SpaceProps } from "styled-system";

import { Box } from "../container";

import { AutoRowProps, RowProps } from "../types";

export const Row = styled(Box)<RowProps>`
  width: ${({ width }) => width ?? "100%"};
  display: flex;
  align-items: ${({ align }) => align ?? "center"};
  justify-content: ${({ justify }) => justify ?? "flex-start"};
  padding: ${({ padding }) => padding ?? "0"};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  ${space}
`;

export const RowBetween = styled(Row)<SpaceProps>`
  justify-content: space-between;
  ${space}
`;

export const RowFlat = styled.div<SpaceProps>`
  display: flex;
  align-items: flex-end;
  ${space}
`;

export const AutoRow = styled(Row)<AutoRowProps>`
  flex-wrap: wrap;
  margin: ${({ gap }) => gap && `-${gap}`};
  justify-content: ${({ justify }) => justify};

  & > * {
    margin: ${({ gap }) => gap} !important;
  }
`;

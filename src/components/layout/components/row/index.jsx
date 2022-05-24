import styled from "styled-components";
import { space } from "styled-system";

import { Box } from "../container";

export const Row = styled(Box)`
  width: ${({ width }) => width ?? "100%"};
  display: flex;
  align-items: ${({ align }) => align ?? "center"};
  justify-content: ${({ justify }) => justify ?? "flex-start"};
  padding: ${({ padding }) => padding ?? "0"};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  ${space}
`;

export const RowBetween = styled(Row)`
  justify-content: space-between;
  ${space}
`;

export const RowFlat = styled.div`
  display: flex;
  align-items: flex-end;
  ${space}
`;

export const AutoRow = styled(Row)`
  flex-wrap: wrap;
  margin: ${({ gap }) => gap && `-${gap}`};
  justify-content: ${({ justify }) => justify};

  & > * {
    margin: ${({ gap }) => gap} !important;
  }
`;

export const RowFixed = styled(Row)`
  width: fit-content;
  margin: ${({ gap }) => gap && `-${gap}`};
`;

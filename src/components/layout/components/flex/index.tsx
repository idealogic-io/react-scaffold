import styled from "styled-components";
import { flexbox } from "styled-system";

import { Box } from "../container";
import { FlexGapProps, FlexLayoutProps } from "../types";

export const Flex = styled(Box)<FlexLayoutProps>`
  display: flex;
  ${flexbox}
`;

export const FlexLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: 280px;
    max-width: 31.5%;
    width: 100%;
  }
`;

export const FlexGap = styled(Flex)<FlexGapProps>`
  gap: ${({ gap }) => gap};
  row-gap: ${({ rowGap }) => rowGap};
  column-gap: ${({ columnGap }) => columnGap};
`;

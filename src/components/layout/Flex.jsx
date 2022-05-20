import styled from "styled-components";
import { flexbox } from "styled-system";

import { Box } from "components";

export const Flex = styled(Box)`
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
    margin: 0 8px;
    margin-bottom: 32px;
  }
`;

export const FlexGap = styled(Flex)`
  gap: ${({ gap }) => gap};
  row-gap: ${({ rowGap }) => rowGap};
  column-gap: ${({ columnGap }) => columnGap};
`;

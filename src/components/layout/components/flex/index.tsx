import styled from "styled-components";
import { flexbox, system } from "styled-system";

import { Box } from "../container";
import { FlexGapProps, FlexProps } from "../types";

const gapStyle = system({
  gap: {
    property: "gap",
    scale: "space",
  },
  rowGap: {
    property: "rowGap",
    scale: "space",
  },
  columnGap: {
    property: "columnGap",
    scale: "space",
  },
});

export const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${flexbox}
`;

export const FlexGap = styled(Flex)<FlexGapProps>`
  gap: ${({ gap }) => gap};
  row-gap: ${({ rowGap }) => rowGap};
  column-gap: ${({ columnGap }) => columnGap};

  ${gapStyle}
`;

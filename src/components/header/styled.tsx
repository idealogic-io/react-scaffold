import styled from "styled-components";

import { Flex, Page } from "components";

export const StyledHeaderContainer = styled(Flex)`
  width: 100%;
  padding: 10px 0;
  justify-content: center;
`;

export const StyledHeaderInternalContainer = styled(Page)`
  height: 60px;
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.semiMedium};
  border: 1px solid ${({ theme }) => theme.colors.monochrome300};
  background-color: ${({ theme }) => theme.colors.monochrome100};
`;

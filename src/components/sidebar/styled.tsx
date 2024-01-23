import styled from "styled-components";

import { Box } from "components";

export const StyledSidebarContainer = styled(Box)`
  height: 100%;
  width: 300px;
  padding: 10px 5px;
  border-right: 1px solid ${({ theme }) => theme.colors.monochrome300};
  background-color: ${({ theme }) => theme.colors.monochrome100};
`;

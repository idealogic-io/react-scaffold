import styled from "styled-components";

import { Box } from "components";

export const DropdownSelectWrapper = styled(Box)`
  cursor: pointer;
  user-select: none;
  border: ${({ theme }) => `1px solid ${theme.colors.monochrome900}`};
  border-radius: ${({ theme }) => theme.radii.medium};
  padding: 8px;
  min-height: 45px;
  display: flex;
`;

import styled, { css } from "styled-components";

import { Box } from "components";

export const DropdownMenuItem = styled.div<{ disabled: boolean }>`
  padding: 8px;
  justify-content: space-between;
  display: flex;

  :hover {
    background-color: ${({ theme }) => theme.colors.monochrome100};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      background-color: ${({ theme }) => theme.colors.monochrome50};
    `}
`;

export const DropdownMenuWrapper = styled(Box)`
  max-height: 300px;
  border-radius: inherit;
  overflow: auto;
`;

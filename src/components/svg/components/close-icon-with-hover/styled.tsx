import styled from "styled-components";

import { Box } from "components/layout";

export const StyledCloseIcon = styled(Box)`
  cursor: pointer;
  opacity: 0.3;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

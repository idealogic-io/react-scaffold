import styled from "styled-components";

import { FlexGap } from "components/layout";

export const StyledButtonsWrapper = styled(FlexGap)`
  padding: 8px;
  justify-content: space-between;
  border-top: ${({ theme }) => `1px solid ${theme.colors.monochrome900}`};
`;

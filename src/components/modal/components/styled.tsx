import styled from "styled-components";
import { Flex } from "components";

export const StyledModalWrapper = styled(Flex)`
  width: 286px;
  padding: 12px;

  ${({ theme }) => theme.mediaQueries.tablet} {
    padding: 24px;
    width: 418px;
  }

  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.monochrome200};
  border-radius: 16px;
`;

import { Flex } from "components/layout";
import styled from "styled-components";

export const StyledFlexWrapper = styled(Flex)`
  height: 100vh;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: min(100% - 2rem, 400px);
  margin-inline: auto;
  word-wrap: break-word;
`;

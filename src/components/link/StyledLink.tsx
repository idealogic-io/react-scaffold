import styled from "styled-components";
import Text from "components/text";
import { LinkProps } from "./types";

export const StyledLink = styled(Text)<LinkProps>`
  display: flex;
  align-items: center;
  width: fit-content;

  &:hover {
    text-decoration: underline;
  }
`;

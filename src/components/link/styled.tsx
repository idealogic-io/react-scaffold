import styled from "styled-components";
import { layout, space } from "styled-system";

import Text from "components/text";
import { LinkProps } from "./types";

export const StyledLink = styled(Text)<LinkProps>`
  display: flex;
  align-items: center;
  width: fit-content;
  color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.accent500)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  text-decoration: ${({ underline }) => (underline ? "underline" : "none")};
  text-decoration-color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.accent500)};

  &:hover {
    text-decoration: ${({ underline }) => (!underline ? "underline" : "none")};
  }

  ${layout}
  ${space}
`;

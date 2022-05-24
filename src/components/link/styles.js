import styled from "styled-components";

export const StyledInternalLink = styled.p`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`;

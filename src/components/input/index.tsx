import styled from "styled-components";
import { space } from "styled-system";
import { InputProps, scales, ThemedProps } from "./types";

const getHeight = ({ scale = scales.MD }: ThemedProps) => {
  switch (scale) {
    case scales.SM:
      return "32px";
    case scales.LG:
      return "48px";
    case scales.MD:
    default:
      return "40px";
  }
};

const Input = styled.input<InputProps>`
  background-color: ${({ theme }) => theme.colors.input};
  border: 0;
  border-radius: ${({ theme }) => theme.radii.medium};
  color: ${({ theme }) => theme.colors.text};
  display: block;
  font-size: 16px;
  height: ${getHeight};
  outline: 0;
  padding: 0 16px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.primary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.primary};
    box-shadow: none;
    color: ${({ theme }) => theme.colors.primary};
    cursor: not-allowed;
  }

  &:focus:not(:disabled) {
    box-shadow: ${({ theme }) => theme.shadows.button};
  }
  ${space}
`;

Input.defaultProps = {
  scale: scales.MD,
};

export default Input;

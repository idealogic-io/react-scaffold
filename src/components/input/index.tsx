import styled from "styled-components";
import { space } from "styled-system";
import { InputProps, scales, ThemedProps } from "./types";

const getHeight = ({ scale = scales.MD }: ThemedProps) => {
  switch (scale) {
    case scales.SM:
      return "26px";
    case scales.MD:
      return "28px";
    case scales.LG:
      return "32px";
  }
};

const Input = styled.input<InputProps>`
  background-color: ${({ theme, $backgroundColor }) =>
    $backgroundColor ? theme.colors[$backgroundColor] : theme.colors.monochrome25};
  color: ${({ theme }) => theme.colors.monochrome900};

  display: block;
  font-size: 14px;
  height: ${getHeight};
  outline: 0;
  padding: 0 12px;
  width: 100%;
  border: 0;

  &::placeholder {
    color: ${({ theme }) => theme.colors.monochrome600};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.monochrome300};
    color: ${({ theme }) => theme.colors.monochrome400};
    cursor: not-allowed;

    &::placeholder {
      color: ${({ theme }) => theme.colors.monochrome400};
    }
  }

  &:focus:not(:disabled) {
  }
  ${space}
`;

Input.defaultProps = {
  scale: scales.SM,
};

export default Input;

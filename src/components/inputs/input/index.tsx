import styled, { css } from "styled-components";
import { space, typography } from "styled-system";
import { InputProps, scales, ThemedProps, BorderProps } from "./types";

const getHeight = ({ scale }: ThemedProps) => {
  switch (scale) {
    case scales.SM:
      return "32px";
    case scales.LG:
      return "48px";
    case scales.MD:
      return "44px";
  }
};

const getBorderStyles = ({ error, isTouched, borderColor, theme }: BorderProps) => {
  if (error && isTouched) {
    return css`
       border: 1px solid ${theme.colors.error400};
       &:focus {
         border: 1px solid ${theme.colors.error400} !important;
       }
       &:hover {
        border: 1px solid ${theme.colors.error400} !important;
      }
    `;
  } else if (borderColor) {
    return css`
        border: 1px solid ${theme.colors[borderColor]};
        &:focus {
        border: 1px solid ${borderColor} !important;
        }
        &:hover {
          border: 1px solid ${borderColor} !important;
        }`;
  }

  return css`
    border: 1px solid ${theme.colors.monochrome300};
  `;
};

export const Input = styled.input<InputProps>`
  background-color: transparent;
  border-radius: ${({ theme }) => theme.radii.semiMedium};
  color: ${({ theme }) => theme.colors.monochrome800};
  font-family: ${({ theme }) => theme.fonts.mv};
  display: block;
  font-size: 14px;
  font-weight: 600;
  height: ${getHeight};
  outline: 0;
  padding: 0 14px;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.monochrome600};
    opacity: 0.6;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.monochrome300};
    box-shadow: none;
    color: ${({ theme }) => theme.colors.monochrome900}24;
    cursor: not-allowed;
    border: none;
  }

  &:focus:not(:disabled) {
    border: 1px solid ${({ theme }) => theme.colors.monochrome400};
  }

  &:hover:not(:disabled) {
    border: 1px solid ${({ theme }) => theme.colors.monochrome400};
  }
  ${getBorderStyles}

  ${typography}
  ${space}
`;

Input.defaultProps = {
  scale: "md",
};

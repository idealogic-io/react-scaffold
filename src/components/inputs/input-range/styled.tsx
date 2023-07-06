import styled, { css } from "styled-components";

import { InputProps, ThemedProps } from "./types";

const getBackgroundGradientColor = ({ theme, disabled, value }: ThemedProps) => css`
  background: ${`linear-gradient(to right, ${
    disabled ? theme.colors.monochrome300 : theme.colors.accent400
  } ${value}%, ${disabled ? theme.colors.monochrome100 : theme.colors.accent200} ${value}%)`};
`;

const getThumbStyles = ({ theme, disabled }: ThemedProps) => css`
  -webkit-appearance: none;
  appearance: none;
  height: 12px;
  width: 12px;
  background-color: ${disabled ? theme.colors.monochrome300 : theme.colors.accent400};
  border-radius: ${theme.radii.circle};
  border: none;
  transition: 0.3s ease;
  &:hover {
    box-shadow: ${!disabled && `0 0 0 12px ${theme.colors.accent400}15`};
  }
  &:focus {
    box-shadow: ${!disabled && `0 0 0 12px ${theme.colors.accent400}30`};
  }
  &:active {
    box-shadow: ${!disabled && `0 0 0 12px ${theme.colors.accent400}30`};
  }
`;

export const StyledRangeInput = styled.input<InputProps>`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  outline: none;
  border-radius: 2px;
  height: 2px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  ${getBackgroundGradientColor};

  ::-webkit-slider-thumb {
    ${getThumbStyles};
  }
  ::-moz-range-thumb {
    ${getThumbStyles};
  }
  ::-ms-thumb {
    ${getThumbStyles};
  }
`;

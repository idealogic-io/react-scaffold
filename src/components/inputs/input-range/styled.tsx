import styled, { DefaultTheme } from "styled-components";
// Types
import { Colors } from "theme/types";
import { StyledInputProps } from "./types";

const mainDimension = "24px";

const getColor = ({ theme, disabled }: { theme: DefaultTheme; disabled?: boolean }) => {
  return disabled ? `${theme.colors.monochrome300}` : `${theme.colors.accent400}`;
};

const makeGreyLineAfterThumb = (color: keyof Colors, width: number) => {
  let i = 10;
  let shadow = `${i}px 0 0 -20px ${color}`;

  for (; i < width; i++) {
    shadow = `${shadow}, ${i}px 0 0 -10.8px ${color}`;
  }

  return shadow;
};

export const StyledRangeInput = styled.input<StyledInputProps>`
  overflow: hidden;
  display: block;
  appearance: none;
  width: 100%;
  margin: 0;
  height: ${mainDimension};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  // before thumb
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 2px;
    background: ${getColor};
  }

  // thumb + after
  &::-webkit-slider-thumb {
    position: relative;
    height: ${mainDimension};
    width: ${mainDimension};
    background: ${getColor};
    border: 2px solid ${getColor};
    border-radius: ${({ theme }) => theme.radii.circle};
    top: 50%;
    transform: translateY(-50%);
    transition: background-color 0.3s ease;
    box-shadow: ${({ theme, afterThumbWidth, disabled }) =>
      !disabled ? makeGreyLineAfterThumb(theme.colors.monochrome300 as keyof Colors, afterThumbWidth) : "none"};
  }

  &:not([disabled]):active {
    &::-webkit-slider-thumb {
      background-color: ${getColor};
    }
  }
`;

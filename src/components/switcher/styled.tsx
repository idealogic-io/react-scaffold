import styled from "styled-components";

import { Scale } from "./types";

import { styles } from "./theme";

export const StyledSwitcher = styled.label<{ checked: boolean; scale?: Scale }>`
  position: relative;
  width: ${({ scale }) => scale && styles[scale].width};
  height: ${({ scale }) => scale && styles[scale].height};
  border-radius: 10px;
  transition: all 0.3s ease-out;
`;

export const Slider = styled.span<{ checked: boolean; disabled?: boolean; scale?: Scale }>`
  // styles for checkbox background
  position: absolute;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ checked, theme, disabled }) =>
    checked
      ? disabled
        ? theme.colors.success50
        : theme.colors.success100
      : disabled
      ? theme.colors.monochrome200
      : theme.colors.monochrome100};
  border-radius: 15px;
  transition: all 0.3s ease-out;
  // styles for moved check part
  &:before {
    content: "";
    position: absolute;
    left: ${({ scale }) => scale && styles[scale].positionLeft};
    bottom: ${({ scale }) => scale && styles[scale].positionLeft};
    width: ${({ scale }) => scale && styles[scale].circleWidth};
    height: ${({ scale }) => scale && styles[scale].circleWidth};
    border-radius: 100%;
    background-color: ${({ checked, theme, disabled }) =>
      checked
        ? disabled
          ? theme.colors.success200
          : theme.colors.success600
        : disabled
        ? theme.colors.monochrome400
        : theme.colors.monochrome600};

    transition: all 0.3s ease-out;
  }

  &:focus-visible {
    outline: none;
  }
`;

export const Checkbox = styled.input<{ checked?: boolean }>`
  visibility: hidden;
  &:focus-visible {
    outline: none;
  }
  &:checked + ${Slider}:before {
    transform: ${({ checked }) => checked && "translateX(140%)"};
  }
`;

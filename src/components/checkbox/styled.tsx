import styled from "styled-components";
import { space } from "styled-system";
import { CheckProps } from "./types";

export const StyledCheckbox = styled.label<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  margin: 0;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  width: fit-content;

  ${space}
`;

export const StyledInput = styled.input`
  opacity: 0;
  pointer-events: none;
  width: 0;
  height: 0;
  display: none;
`;

export const CustomCheckbox = styled.div<CheckProps>`
  width: 24px;
  height: 24px;
  border: 1px solid ${({ theme, disabled }) => (disabled ? theme.colors.monochrome400 : theme.colors.accent400)};
  background-color: ${({ theme, checked, disabled }) =>
    disabled ? theme.colors.monochrome300 : checked ? theme.colors.accent400 : "transparent"};
  border-radius: ${({ theme }) => theme.radii.semiMedium};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:not([disabled]):hover {
    border: 1px solid ${({ theme }) => theme.colors.accent400};
    background-color: ${({ theme, checked }) => !checked && theme.colors.accent300};
  }
`;
